import { Image } from '@aws-amplify/ui-react';

function Card() {

    return (
        <div>

            <Image
                alt="Bea e Joao"
                srcSet="/assets/Header_v4.png 300w, /assets/Header_v4.png 375w"
                sizes="(min-width: 400px) 300px"
                src="/assets/Header_v4.png.png"
                height="100%"
                width="100%"
            />

        </div>
    );
}

export default Card;