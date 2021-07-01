$(document).ready(function(){
    // Mobile Menu
    $('.mobile-menu-btn button,.main-menu a').click(function(e){
        let screenSize = window.innerWidth;
        console.log(screenSize)
        if(screenSize > 1024) return
        $('.main-menu').toggleClass('open-menu')
    })
    $('.mobile-close button').click(function(){
        $('.main-menu').toggleClass('open-menu')
    })
    
    // Sticky Header
    $(window).scroll(function(){
        let scrollPosition = $(window).scrollTop();
        let headerDiv = $('.header');
        if(scrollPosition > 90){
            headerDiv.addClass('sticky')
        } else{
            headerDiv.removeClass('sticky')
        }
    });

    // Works Slider
    $('#works-slider').owlCarousel({
        dots:true,
        loop:true,
        margin:30,
        nav:false,
        autoplay:false,
        responsive : {
            0 : {
                items : 1,
            },
            667 : {
                items : 2,
            },
            1024 : {
                items: 4
            }
        }
      });

    // UUID Generator for each comment
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

    // Comment Form
    let comments = [];
    $('#comment-form').submit(function(e){
        e.preventDefault();
        let id = uuidv4();
        let fullName = $('#fullname').val();
        let email = $('#email').val();
        let content = $('#comment').val();

        if(!fullName || !email || !content ){
            return alert('Doldursana be kardeşim')
        }
        let newComment = {
            id,
            fullName,
            email,
            content
        }
        comments.push(newComment);
        $('#fullname').val("")
        $('#email').val("");
        $('#comment').val("");
        createCommentListUI();
    });

    function createCommentListUI(){
        let commentWrapper = $('.testimonial-content');
        commentWrapper.html("");
        if(comments.length === 0){
            commentWrapper.html("Henüz hiç yorum yapılmamış...");
            return;
        }
        comments.map(comment => {
            commentWrapper.append(`
            <div class="comment">
                <div class="comment-author">${comment.fullName} <div class="comment-date">30 Haziran 2021</div></div>
                <div class="comment-author-email">${comment.email}</div>
                <div class="comment-text">${comment.content} <button class="delete-comment" data-id="${comment.id}">SİL</button></div>
            </div>
            `);
        })
    }

    // Delete Comment based on ID
    $('body').on('click','.delete-comment',function(){
        let targetID = $(this).data('id');
        comments = comments.filter(comment => {
            return comment.id !== targetID;
        })
        createCommentListUI();
    })
    

    // Init CreateCommentUI
    createCommentListUI();
})