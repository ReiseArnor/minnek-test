import { useState, useEffect } from 'react';
import { axios } from '../config/api';
import { useAuth } from "../hooks/use-auth";
import {
    CarouselProvider, Slider, Slide,
    ButtonBack, ButtonNext
} from 'pure-react-carousel';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import 'pure-react-carousel/dist/react-carousel.es.css';
import '../css/carousel.css';

export const Carousel = () => {
    const auth = useAuth();
    const [items, setItems] = useState([]);

    const get_data = async () => {
        const res = await axios.get("/last-dogs", { headers: auth.headers() });
        setItems(res.data.dog_list);
        console.log(items);
    };

    useEffect(() => {
        get_data();
        // eslint-disable-next-line
    }, []);

    return (
        <CarouselProvider
            className="column is-full"
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={11}
            visibleSlides={4}
        >
        <div className="container">
            <Slider className="box">
                {
                    items.map((data, index) =>
                        <Slide key={index} index={index} className="mx-1">
                            <div className="card has-background-grey-darker">
                                <div className="card-image">
                                    <figure className="image is-3by2">
                                        <img src={axios.defaults.baseURL + "/get-image/" + data.image} alt={data.name}/>
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-content">
                                            <p className="title is-4 has-text-light">{data.name}</p>
                                            <p className="subtitle is-6 has-text-light">Breed: {data.breed}</p>
                                        </div>
                                    </div>
                                    <div className="content has-text-light">
                                        Sub-breeds: {data.sub_breeds.map((item, index) => index >= data.sub_breeds.length - 1 ? item.name : item.name + ", ")}
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )
                }
               </Slider>
            <Button component={ButtonBack} className="buttonBack has-background-grey-darker has-text-light"> <ArrowLeft className="arrow"/> </Button>
            <Button component={ButtonNext} className="buttonNext has-background-grey-darker has-text-light"> <ArrowRight className="arrow" /></Button>
            </div>

                    </CarouselProvider>
    );
};
