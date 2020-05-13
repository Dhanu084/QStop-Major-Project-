{
    let createPost = function (){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            console.log(e);
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/post/create',
                data:newPostForm.serialize(),
                success:function(data){
                    let newPost = $('#available-posts-container');
                    
                    let newDiv = $('<div>',{
                        "class":"card"
                    },
                    '</div>')
                    let datas = data.data.post;
                    newDiv.attr('href',datas.id);
                    console.log(data.data.user.avatar);
                    let img = $('<img />').attr({
                        'src':data.data.user.avatar
                    })
                    console.log(img);
                    img.appendTo(newDiv)
                    newDiv.html('<strong>'+datas.content+'</strong>'+'<small> posted by '+datas.user.Username+'('+datas.user.designation+')</small>')
                    
                    let newa = $('<a>','</a>')
                    newDiv.appendTo(newa);
                    newa.attr('href','/post/single/'+datas._id)
                    console.log(datas);
                    newa.prependTo(newPost);

                    let aside = $('#aside-container');
                    let newb = $('<a>','</a>')
                    let newP = $('<p>','</p>')
                    newb.attr('href','/post/single/'+datas._id)
                    newP.html('<strong>'+datas.content+'</strong>')
                    newP.appendTo(newb)
                    
                    //console.log(aside);
                    newb.prependTo(aside)
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    createPost();
}