import React, {Component} from 'react';
import FloatingWhatsApp from 'react-floating-whatsapp'

class Index extends Component {
    render() {
        return (
            <div>
                <FloatingWhatsApp phoneNumber={601121460908} accountName={'HolaClothes Service Center'} avatar={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwMg7cXbg-PwqLGnq-MWLBmZ5rRBQ50-BpEg&usqp=CAU'} />
            </div>
        );
    }
}

export default Index;