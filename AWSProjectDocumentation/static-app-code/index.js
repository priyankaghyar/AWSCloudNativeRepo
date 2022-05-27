$(document).ready(function(){
    readData()
    submitforms();

    $('#full').click(function(){
        let title=$("#title").val();
        let description=$('#description').val();
        let completiondate=$('#completiondate').val();
        let imagename=$('#form1 #myfile').val().split('\\').pop();;
        let docname=$('#form2 #myfile').val().split('\\').pop();;
        alert(title+" "+description+" "+completiondate+" "+imagename+" "+docname)
        $.ajax('http://localhost:4500/tasks', {
            type: 'POST',  // http method
            data: { id:Math.round(Math.random()*10000),title:title,Description:description,completiondate:completiondate,imagename:imagename,docname:docname},  // data to submit
            success: function (data, status, xhr) {
                alert("uploaded Successfully")
               console.log($("#form1"))
               $( '#btn1' )[0].click()
               $( '#btn2' )[0].click()

             
            },
            error: function (jqXhr, textStatus, errorMessage) {
                    alert("failure");
            }
        });
    })
})


function submitforms(){
    console.log($('#form1')[0])
$( '#btn1' ).click(

function( e ) {
    e.preventDefault();
    let form = $('#form1')[0]
  console.log('this is getting called')
  $.ajax( {
    url: 'http://3.6.87.188:5000/upload-image',
    type: 'POST',
    data: new FormData( form ),
    processData: false,
    contentType: false,
    success:function(){
        console.log("file successfully uploaded")
    },
    error:function(e){
        console.log(e)
    }
  } );
  e.preventDefault();
} );
$( '#btn2' ).click( function( e ) {

    e.preventDefault();
    let form = $('#form2')[0]
  $.ajax( {
    url: 'http://3.6.87.188:5000/upload-image',
    type: 'POST',
    data: new FormData( form ),
    processData: false,
    contentType: false,
    success:function(){
        console.log("file successfully uploaded")
    },
    error:function(e){
        console.log(e)
    }
  } );
 
} );
}
function readData(){
    $.get("http://localhost:4500/tasks",function(data){
        let code="<ul class='list-group'>"
        for(let x in data){
           code+="<li class='list-group-item'>"
           code+="<h3>"+data[x].title+"</h3>"
           code+="<p>"+data[x].Description+"</p>"
           code+="<h6>Completion Date:"+data[x].completiondate+"</h6>"
           code+="<h5> Document :: <a href='http://localhost:8090/"+data[x].docname+"'>"+data[x].docname+"</a><h5>"
           code+="<h5>Image::<h5>"+"<img src='http://localhost:8090/"+data[x].imagename+"'>"
           code+="</li>"
        }
        code+="</ul>"
        $("#container").html(code)
    })
}