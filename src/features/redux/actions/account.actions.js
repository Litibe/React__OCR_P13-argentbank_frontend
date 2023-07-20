import { toast } from "react-toastify";

export const POST_LOGIN = "POST_LOGIN";

export const postLogin = () => {
    return async (dispatch) => {
        const response = await fetch(
            "http://localhost:3001/api/v1/user/login",
            {
                method: "post",
                headers: new Headers({
                    Accept: "application/json",
                }),
                body: {},
            }
        );
        const data = await response.json();
        if (data.status === 200) {
            toast.success("Connexion OK", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } else if (data.status === 400) {
            toast.warn("Champs Invalides", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } else if (data.status === 500) {
            toast.error("Erreur Serveur", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
        console.log(data);
    };
};
