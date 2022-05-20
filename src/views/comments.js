import { createComment, getCommentsByRecipe } from "../api/comments.js";
import { getUserData } from "../api/util.js";
import { html, until, render} from "../lib.js";
import { spinner } from "./common.js";

const commentTemplate = (commentsPromise, active, onSubmit) => html` 
  <div class="section-title">Comments for Recipe</div>

  <div class="comments">
    <ul>
      <li class="comment">
        ${until(commentsPromise, spinner())}
      </li>
    </ul>
  </div>
  ${commentForm(active, onSubmit)}

`;

const commentForm = (active, onSubmit) => {
  if (active) {
    return html` 
    <article class="new-comment">
      <h2>New comment</h2>
      <form @submit=${onSubmit} id="commentForm">
        <textarea name="content" placeholder="Type comment"></textarea>
        <input type="submit" value="Add comment"/>
      </form>
    </article>`;
  }
};

const commentCard = (comment, username) => {

    return html`
        <li class="comment">
            <header>${username} <span class="comment-date"> ${(new Date(comment.createdAt)).toLocaleString()}</span></header>
            <p class="comment-us">${comment.content}</p>
        </li>`
}

export function commentsView(ctx) {
    const isLogged = getUserData()
    const container = document.getElementById('comments-container')
    update()
  
    function update(){
        render(commentTemplate(loadComments(ctx), isLogged, onSubmit), container)
    }

    async function onSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const content = formData.get('content').trim()
    
        await createComment({content}, ctx.params.id)
        e.target.reset()
        update()
    }
}



async function loadComments(ctx) {
    const recipeId = ctx.params.id
    const comments = (await getCommentsByRecipe(recipeId)).results

    return comments.map(c => commentCard(c, c.author.username))

}
