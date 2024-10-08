import commentAPI from "../../../api/comments-api";
import { useForm } from "../../../hooks/useForm";

export default function CreateComment({
    gameId,
    onCommentCreated
}) {
    const initialData = {
        content: '',
    };

    const formSubmitHandler = async ({ content }) => {
        try {
            const newComment = await commentAPI.createComment(gameId, content);
            clearFormFields();
            onCommentCreated(newComment);

        } catch (error) {
            console.log(error.message);
        };

    };

    const {
        values,
        changeHandler,
        submitHandler,
        clearFormFields
    } = useForm(initialData, formSubmitHandler);


    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" onSubmit={submitHandler}>
                <textarea
                    name="content"
                    placeholder="Comment......"
                    value={values.content}
                    onChange={changeHandler}
                    required
                />
                <input
                    className="btn submit"
                    type="submit"
                    value="Add Comment"
                    disabled={!values.content.trim()}
                />
            </form>
        </article>

    )
}