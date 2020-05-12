// {
//     let createComment = function(){
//         let newCommentForm = $('#comments-form');
//         console.log(newCommentForm);
//         newCommentForm.submit(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type:'POST',
//                 url:'/comment/create',
//                 data:newCommentForm.serialize(),
//                 success:function(data){
//                     console.log(data);
//                     let newDiv = $('<div>',{
//                         "class":"card"
//                     },'</div>');
//                     let iconsDiv = $('div',{
//                         "class":"icons"
//                     },'</div>')
//                     let comment = data.data.comment.content;
//                     iconsDiv.html('<div>'+<i class="far fa-thumbs-up"></i>+'</div>');
//                     console.log(iconsDiv);
//                     iconsDiv.appendTo(newDiv);
//                     newDiv.html(comment);
//                     //console.log(comment);
//                     let available_comments = $('#available-comments');
//                     newDiv.prependTo(available_comments);
//                     //console.log(available_comments);
//                 },
//                 error:function(error){
//                     console.log(error.responseText);
//                 }

//             })
//         })

//     }

//     createComment();
// }