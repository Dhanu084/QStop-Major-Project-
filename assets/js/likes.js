{
    let a = 0;
    let item = $('#available-comments .icons > div >a');
    console.log(item);
    $('#available-comments .icons > div >a').on('click',function(e){
        a = e.target
        e.preventDefault();
        console.log($(this))
        let current = $(this)[0];
        console.log(current.id);
        let urltogo = current.href
        console.log(urltogo);
            $.ajax({
                type:'post',
                url:urltogo,
                data:urltogo,
                success:function(data){
                    // let ele = document.getElementById(current.id);
                    // console.log(ele.getElementsByTagName('i')[0].style.color='red');
                    let countId = current.id+'likes';
                    let newcount = document.getElementById(countId);
                    if(data.message != "Already liked")
                    newcount.innerHTML = parseInt(newcount.innerHTML)+1;
                    else newcount.innerHTML = parseInt(newcount.innerHTML)-1;
                    console.log(newcount.innerHTML);
                    console.log(data);
                    
                },
                error:function(err){
                    console.log(err.responsText);
                }
            })
    })



    
}