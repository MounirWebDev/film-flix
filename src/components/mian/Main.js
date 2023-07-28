import './Main.css';


export default function Main({ children }) {
    return (
        <main className="movie-box-container">
            {children}
        </main>
    );
}

// function Box2() {
//     return (
//         <section className="movie-detail-box">
//             <p>soon...</p>
//         </section>
//     );
// }
