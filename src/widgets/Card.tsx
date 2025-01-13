import { Image } from '@aws-amplify/ui-react';

function Card() {

    return (
        <div>

            <Image
                alt="Bea e Joao"
                srcSet="/assets/Desktop.png 300w, /assets/header_v2.png 375w"
                sizes="(min-width: 400px) 300px"
                src="/assets/Desktop.png"
                height="100%"
                width="100%"
            />

        </div>
    );
}

export default Card;