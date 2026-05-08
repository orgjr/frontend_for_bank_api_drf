import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import bg from '../assets/images/bg_card_ok.png';
import family from '../assets/images/family.jpeg';
import business from '../assets/images/business_meeting.jpeg';
import fun from '../assets/images/fun.jpeg';
import payment from '../assets/images/payment.png';
import '../styles/footerReveal.css';
import useSmoothSnap from '../hooks/useSmoothSnap';

export default function Index() {
  const [footerRevealed, setFooterRevealed] = useState(() => {
    return sessionStorage.getItem('footer_revealed') === 'true';
  });
  const { containerRef } = useOutletContext();

  useEffect(() => {
    const slide5 = document.getElementById('slide-5');
    const container = document.getElementById('scroll-container');

    if (!container || !slide5 || footerRevealed) return;

    const handleScroll = () => {
      const containerTop = container.scrollTop;
      const slideTop = slide5.offsetTop;

      if (containerTop >= slideTop) {
        setFooterRevealed(true);
        sessionStorage.setItem('footer_revealed', 'true');
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [footerRevealed]);
  useSmoothSnap();

  return (
    <div
      id="scroll-container"
      ref={containerRef}
      className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black"
    >
      {/* Slide 1 */}
      <section
        style={{ backgroundImage: `url(${bg})` }}
        className="bg-cover h-screen w-full snap-start flex items-center justify-center"
      />

      {/* Slide 2 */}
      <section
        style={{ backgroundImage: `url(${family})` }}
        className="bg-cover h-screen w-full snap-start flex"
      >
        <div className="m-[100px] w-lg">
          <h1 className="font-bold text-4xl text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.9)] select-none">
            Aproveite ao lado de quem mais importa.
          </h1>
        </div>
      </section>

      {/* Slide 3 */}
      <section
        style={{ backgroundImage: `url(${business})` }}
        className="bg-cover h-screen w-full snap-start flex"
      >
        <div className="flex w-[400px] items-end mb-28 ml-auto mr-8">
          <h1 className="font-bold text-4xl text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.9)] select-none">
            Estamos com você em qualquer lugar do mundo.
          </h1>
        </div>
      </section>

      {/* Slide 4 */}
      <section
        style={{ backgroundImage: `url(${fun})` }}
        className="bg-cover h-screen w-full snap-start flex"
      >
        <div className="flex w-[600px] items-start mt-28 ml-28">
          <h1 className="font-bold text-4xl text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.9)] select-none">
            Curta a vida sem preocupações.
          </h1>
        </div>
      </section>

      {/* Slide 5 */}
      <section
        id="slide-5"
        className={`relative isolate w-full snap-start ${footerRevealed ? 'h-auto' : 'h-[130vh]'}`}
      >
        <div
          className="sticky top-0 h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${payment})` }}
        />

        {/* Footer */}
        <div className="relative bg-[rgba(0,0,0,0.5)] bg-opacity-50 w-full p-10 text-white select-none">
          <nav
            className={`mx-20 flex flex-col gap-6 ${!footerRevealed ? 'opacity-0 translate-y-10' : 'animate-fadeUp opacity-100 select-none'}`}
          >
            <h2 className="text-3xl font-bold">Conecte-se conosco</h2>
            <div className="flex gap-6">
              <div className="flex gap-6 mr-auto">
                <a href="#" className="hover:underline">
                  Sobre
                </a>
                <a href="#" className="hover:underline">
                  Contato
                </a>
                <a href="#" className="hover:underline">
                  Suporte
                </a>
              </div>
              <div className="flex gap-12">
                <div className="flex gap-4">
                  <a href="#">Instagram</a>
                  <a href="#">LinkedIn</a>
                </div>
                <p className="text-sm opacity-70">© 2026 sk bank</p>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
