{
  let createPOST = function () {
    let newPostForm = $("#new-post-form");
    newPostForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/post/create-post",
        data: newPostForm.serialize(),

        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $("#post-list-container>ul").prepend(newPost);
          console.log("Data", data);
        },
        error: function (error) {
          console.log("Error", error.resposeText);
        },
      });
    });
  };

  let newPostDom = function (post) {
    return $(`<li id='post-${post._id}'>
    <p>
        <b>
        ${post.user.name}
        </b>
        <br>
        ${post.content}
            
                <a href="/post/delete-post/${post.id}"><button type="submit">Delete
                        Post</button></a>
               

    </p>
    
        <form action="/comment/create-comment" method="POST">
            <textarea name='content' cols="30" rows="2" placeholder="Write a Comment..........." required></textarea>
            <input type="hidden" name="post" value="${post._id}">
            <button type="submit">Comment</button>
        </form>
      
            <ol id="post-comment-${post._id}>
                
            </ol>
</li>`);
  };
  createPOST();
}
