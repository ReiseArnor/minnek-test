import { useState } from 'react';
import { axios } from '../config/api';
import { useAuth } from '../hooks/use-auth';
import { useForm } from 'react-hook-form';

export const NewDog = () => {
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const onSubmit = async (data) => {
        console.log(data);
        const form = new FormData();
        form.append('img', data.image[0]);
        form.append('name', data.name);
        form.append('breed', data.breed);
        form.append('sub_breed', data.sub_breed);
        const response = await axios.post("/create-dog",
            form,
            {
                headers: auth.headers()
            }
        );

        if (response.error) {
        setSuccess(null);
            setError(response.message);
            return;
        }
        setError(null);
        setSuccess(response.data.message);
    }

    return <div className="columns is-centered">
        <div className="box is-half has-background-white-bis">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label">Image</label>
                    <div className="control">
                        <input className="input is-medium" {...register('image', { required: true })} type="file" accept="image/png, image/jpeg" />
                        {errors.image && <p className="help is-danger">Image is required.</p>}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input is-medium" {...register('name', { required: true })} type="string" />
                        {errors.name && <p className="help is-danger">Name is required.</p>}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Breed</label>
                    <div className="control">
                        <input className="input is-medium" {...register('breed', { required: true })} type="string" />
                        {errors.breed && <p className="help is-danger">Breed is required.</p>}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Sub-Breeds</label>
                    <div className="control">
                        <input className="input is-medium" {...register('sub_breed')} type="string" pattern="^[a-zA-Z]+(,[a-zA-Z]+)*$"/>
                        {errors.sub_breed && <p className="help is-danger">Sub-Breed is required.</p>}
                    </div>
                </div>

                <input className="input is-medium" type="submit" value="Create Dog" />

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
}
