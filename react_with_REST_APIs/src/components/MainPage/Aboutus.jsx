import React from 'react'
import rcoem from '../../media/rcoem.jpg'
function Aboutus() {
    return (
        <>
            <br />
            <br />
            <br />
            <div className="jumbotron">
                <h1 className="display-4">About Us!!</h1>
                <hr className="my-4" />
                <p className="lead">
                    <img src={rcoem} className="img-fluid" alt="Responsive image" style={{ borderRadius: "50px" }} />
                    <hr className="my-4" />
                    One of The Prestigious Coding CLub Of Shri Ramdeobaba College Of Engineering and Management.<br /><br/>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est optio vel quibusdam veritatis distinctio nisi adipisci. 
                    Odit quos nesciunt nihil numquam quidem pariatur sequi doloribus porro deleniti iusto unde quasi laudantium,
                    assumenda eaque nobis, voluptate, nisi adipisci rem explicabo facilis sed tenetur. Quae ab dolores unde, aut,
                    similique architecto temporibus veritatis eligendi facilis, dolorum voluptates? Minus consectetur sed facere labore dolorum fuga, 
                    numquam dignissimos sunt recusandae? At quidem voluptate maiores rem, natus assumenda magnam neque sed corrupti amet reiciendis in 
                    libero odio doloremque nesciunt id harum nobis quaerat cumque sit? Nemo optio aliquam expedita quo nam et odit pariatur itaque quae velit!
                    Alias possimus iusto quos facere culpa! Accusamus non pariatur, quos maiores commodi eum impedit deserunt ad quia molestias dicta quis iste 
                    <hr className="my-4" />

                    <a className="btn btn-dark btn-lg" href="/" role="button">Return Back</a>
                </p>
            </div>
        </>
    )
}

export default Aboutus
