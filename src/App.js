import './App.css';
import {basicFetch, speciesFetch} from "./api";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import search from "./img/search.png";
// import substitute from "./img/substitute.png"

export default function App() {
    const [pokemon, setPokemon] = useState(1)
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])

    let textInput = React.createRef();
    let handleClick = (e) => {
        e.preventDefault();
        setPokemon(textInput.current.value.toLowerCase());
    }

    let previous = (e) => {
        e.preventDefault();
        setPokemon(data.id - 1)
    }

    let next = (e) => {
        e.preventDefault();
        setPokemon(data.id + 1)
    }

    useEffect(() => {
        const fetchPokemon = async () => {
            let list1 = await basicFetch(pokemon);
            let list2 = await speciesFetch(pokemon)
            setData(list1)
            setData2(list2)
        }
        fetchPokemon();
    }, [pokemon]);

    let id = data.id
    id = (data.id < 100) ? (data.id > 10) ? '0' + id : '00' + id : data.id

    return (
        <div className="App">
            <Header>
                <h1>Pokedex</h1>
                <SearchBar>
                    <input type="text"
                           name="Search bar"
                           placeholder="Insert a pokemon name or id"
                           ref={textInput}
                    />
                    <button type="submit" name="button" onClick={handleClick}/>
                </SearchBar>
            </Header>
            <Content>
                <PokemonPicture id={`${data.id}`}/>
                <PokemonInfo>
                    <JapaneseName>フシギダネ</JapaneseName>
                    <PokemonName>{data.name}<span>{`#${id}`}</span></PokemonName>
                    <PokemonType>{'grass'}</PokemonType>
                    <SubTitle>Base stats</SubTitle>
                    <Stats>
                        <div>
                            <h4>hp</h4>
                            <p>20</p>
                        </div>

                        <div>
                            <h4>atk</h4>
                            <p>115</p>
                        </div>

                        <div>
                            <h4>def</h4>
                            <p>75</p>
                        </div>

                        <div>
                            <h4>sp. atk</h4>
                            <p>55</p>
                        </div>

                        <div>
                            <h4>sp. def</h4>
                            <p>75</p>
                        </div>

                        <div>
                            <h4>speed</h4>
                            <p>82</p>
                        </div>
                    </Stats>

                    <SubTitle>Other information</SubTitle>
                    <Stats>
                        <div>
                            <h4>species</h4>
                            <p>seed pokemon</p>
                        </div>
                        <div>
                            <h4>height</h4>
                            <p>{data.height / 10}m</p>
                        </div>
                        <div>
                            <h4>weight</h4>
                            <p>{data.weight / 10}kg</p>
                        </div>
                    </Stats>
                    <Nav>
                        <ul>
                            <li onClick={previous}>&lt; previous</li>
                            <li onClick={next}>next &gt;</li>
                        </ul>
                    </Nav>
                </PokemonInfo>
            </Content>
        </div>
    );
}

const colors = {
    white: '#ffffff', gray: '#2F3136', gray2: '#727478', black: '#2F3136', purple: '#702BFE',
}

const Header = styled.header`
  background-color: ${colors.gray};
  color: ${colors.white};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 150px;

  h1 {
    font-size: 36px;
    text-transform: uppercase;
    user-select: none;
  }
`

const SearchBar = styled.div`
  height: 40px;
  width: 730px;
  display: flex;
  justify-items: center;

  input {
    width: 100%;
    height: inherit;
    padding-left: 15px;
    border: none;
    border-radius: 5px 0 0 5px;
    font-weight: 600;
  }

  button {
    border: none;
    border-radius: 0 5px 5px 0;
    height: inherit;
    width: 50px;
    background: ${colors.purple} url(${search}) no-repeat center;
    cursor: pointer;

    &:hover {
      background-color: rgba(112, 43, 254, 0.8);
    }
  }
`

const Content = styled.main`
  padding: 50px 0;
  height: 1080px;
  background-color: #36393F;
  color: ${colors.white};
  display: flex;
  justify-content: center;
  gap: 70px;
`

const PokemonPicture = styled.div`
  background-color: ${colors.black};
  width: 400px;
  height: 400px;
  border-radius: 50%;
  position: relative;

  &:before {
    content: "";
    width: 400px;
    height: 400px;
    background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props => props.id}.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: absolute;
  }
`

const PokemonInfo = styled.div`
  height: 450px;
  width: 460px;
`

const JapaneseName = styled.span`
  font-size: 18px;
  color: ${colors.gray2};
`

const PokemonName = styled.h2`
  text-transform: uppercase;
  font-size: 48px;
  line-height: 2.5rem;

  span {
    color: ${colors.gray2};
  }
`

const PokemonType = styled.span`
  text-transform: uppercase;
  font-size: 14px;
  display: inline-block;
  padding: 2px 13px;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #7c5; // this depends on the type
`

const SubTitle = styled.h3`
  font-size: 14px;
  color: ${colors.gray2};
  text-transform: uppercase;
  padding-top: 28px;
`

const Stats = styled.div`
  display: flex;
  gap: 5px;

  div {
    background-color: ${colors.gray};
    border-radius: 5px;
    min-width: 73px;
    height: 60px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h4 {
      color: ${colors.gray2};
      text-transform: uppercase;
      font-size: 12px;
    }

    p {
      text-transform: uppercase;
      margin: 0 10px;
    }
  }
`

const Nav = styled.nav`
  padding-top: 20px;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    text-transform: uppercase;

    cursor: pointer;
    user-select: none;
  }
`