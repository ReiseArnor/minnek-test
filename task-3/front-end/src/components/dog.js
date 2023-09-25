import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { axios } from '../config/api';
import { useAuth } from '../hooks/use-auth';

export const Dog = () => {
    const auth = useAuth();
    const { id } = useParams();
    const [dog, setDog] = useState({ sub_breeds: [] });
    const [editMode, setEditMode] = useState(false);
    const [subbreeds, setSubbreeds] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    const get_info = async () => {
        const res = await axios.get("/dog/" + id, { headers: auth.headers() });
        console.log(res);
        setDog(res.data.dog);
        setSubbreeds(dog.sub_breeds.map((d, i) => d.name));
        console.log(dog);
    };

    const update_dog = async (data) => {
        console.log(data);
        const form = new FormData();
        form.append('dog_id', id);
        form.append('img', data.image[0]);
        form.append('name', data.name);
        form.append('breed', data.breed);
        form.append('sub_breed', data.sub_breed);

        const response = await axios.put("/update-dog", form, {headers: auth.headers()});
        if (response.error) {
            setSuccess(null);
            setError(response.message);
            return;
        }
        setError(null);
        setSuccess(response.data.message);

    };

    const delete_dog = async () => {
        const response = await axios.delete("/delete-dog", {headers: auth.headers(), data: {id: id}} );
        if (response.error) {
            setSuccess(null);
            setError(response.message);
            return;
        }
        setError(null);
        setSuccess(response.data.message);
    };

    useEffect(() => {
        get_info();
        // eslint-disable-next-line
    }, []);

    const toggle_edit = () => {
        setEditMode(!editMode);
    }

    return <div className="columns is-centered">
        <div className="card box column is-half">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={axios.defaults.baseURL + "/get-image/" + dog.image} alt={dog.name} />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <form className="is-centered" onSubmit={handleSubmit(update_dog)}>
                        <div className="field">
                            <label className="label">Image</label>
                            <div className="control">
                                <input className="input is-medium" {...register('image', {required: true})} type="file" accept="image/png, image/jpeg" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                 <input className="input is-medium" {...register('name')} type="string" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Breed</label>
                            <div className="control">
        <input className="input is-medium" {...register('breed')} type="string" /> :
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Sub-Breeds</label>
                            <div className="control">
        <input className="input is-medium" {...register('sub_breed')} type="string" pattern="^[a-zA-Z]+(,[a-zA-Z]+)*$" />
                            </div>
                        </div>
                        <div className="columns box">
                            <input className="input column is-primary" type="submit" value="Update Dog" />
                            <button className="button column is-danger" onClick={delete_dog}>Delete</button>
                        </div>

                        {success && (
                            <div className="notification is-success is-light">
                                {success}
                            </div>
                        )}

                        {error && (
                            <div className="notification is-danger is-light">
                                <button className="delete"></button>
                                <strong>ERROR: </strong>
                                {error}
                            </div>
                        )}

                    </form>
                </div>
            </div>
        </div>
    </div>;
}
