{
    $('#other-user').on('click',function(e){
        e.preventDefault();
        let a = $('#other-user')[0];
        console.log(a.href);
        let urltogo = a.href;
        $.ajax({
            type:'post',
            url: urltogo,
            success:function(data){
                let count = $('#friend-count')[0];
                //console.log(count);
                if(data.message == "friend removed"){
                    count.innerHTML = parseInt(count.innerHTML)-1;
                }
                else{
                    count.innerHTML = parseInt(count.innerHTML)+1;
                }
            },
            error:function(err){
                console.log(err);
            }
        })
    })
}