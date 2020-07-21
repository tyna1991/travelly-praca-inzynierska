import React from 'react';
import '../../App.css';
import travellers from '../../assets/travellers (2).png'

class Main extends React.Component{

    render(){
        return(
        <main>
            <div className="main-1 container main-page">
              <div className="main-1-desc"><span className="desc-1">
                  Wyrusz w podróż z Travelly.
                </span>
                <span className="desc-2">Planuj, tworząc listę miejc, które chcesz zwiedzić, tak by <span className="span--font-weight">była to niezapomniana przygoda.</span>
                </span>
                <span className="desc-3">Zapisz wszystkie potrzebne informacje w Travelly.
                </span>
        
              </div>
              <div className="main-1-img"><img src={travellers} alt="travellers with suitcases"/></div>
            </div>
            <div className="main-2">
              <h2>Dowiedz się więcej
              </h2>
              <div className="main-2--background-img">
                <div className="blocks-info-4">
                  <div className="block">
                    <h3>Terminarz</h3>
                    <p>Twórz harmonogram podróży, dodając miejsca, które chcesz zwiedzić.
        
                    </p>
                  </div>
                  <div className="block">
                    <h3>Lista rzeczy</h3>
                    <p>
                       Korzystając z listy, nie zapomnisz o niezbędnych rzeczach, potrzebnych w podrózy.
                    </p>
                  </div>
                  <div className="block">
                    <h3>Trasa</h3>
                    <p>
                      Sprawdzaj jaką obrać trasę od jednego punktu podróży, do drugiego.
                    </p>
                  </div>
                  <div className="block">
                    <h3>Notatki</h3>
                    <p>Chcesz zapisać najważniejsze dla ciebie informacje? Teraz możesz je mieć na wyciągnięcie ręki.
        
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )

    }
}

export default Main