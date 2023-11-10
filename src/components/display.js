import React, { Component } from "react";
import styled from "styled-components";
import { colors, type_colors } from "./variables";
import axios from "axios";
import search from "../img/search.png";
import pokeball from "../img/pokeball.svg";

export default class Display extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: `${Math.floor(Math.random() * 900) + 1}`,
			name: "",
			romaji: "",
			specie: "",
			pokemonId: "",
			id: "",
			imageUrl: "",
			types: [],
			description: "",
			stats: {
				hp: "",
				attack: "",
				defense: "",
				speed: "",
				specialAttack: "",
				specialDefence: "",
			},
			height: "",
			weight: "",
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.onSubmitForm = this.onSubmitForm.bind(this);
	}

	async loadPokemon() {
		let pokemonId = this.state.input;
		const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
		const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`;
		const pokemonRes = await axios.get(pokemonUrl);
		const speciesRes = await axios.get(pokemonSpeciesUrl);

		let { hp, attack, defense, speed, specialAttack, specialDefense } = "";
		let romaji = "";
		let description = "";
		const name = pokemonRes.data.name;
		const imageUrl =
			pokemonRes.data.sprites.other["official-artwork"].front_default;
		const id = pokemonRes.data.id;
		const height = pokemonRes.data.height / 10;
		const weight = pokemonRes.data.weight / 10;
		const types = pokemonRes.data.types.map((type) => type.type.name);
		const specie = speciesRes.data.genera[7].genus;
		const japanese = speciesRes.data.names[0].name;

		speciesRes.data.names.some((name) => {
			if (name.language.name === "roomaji") {
				romaji = name.name;
				return;
			}
		});

		speciesRes.data.flavor_text_entries.some((flavor) => {
			if (flavor.language.name === "en") {
				description = flavor.flavor_text;
			}
		});

		pokemonRes.data.stats.map((stat) => {
			switch (stat.stat.name) {
				case "hp":
					hp = stat["base_stat"];
					break;
				case "attack":
					attack = stat["base_stat"];
					break;
				case "defense":
					defense = stat["base_stat"];
					break;
				case "speed":
					speed = stat["base_stat"];
					break;
				case "special-attack":
					specialAttack = stat["base_stat"];
					break;
				case "special-defense":
					specialDefense = stat["base_stat"];
					break;
			}
		});

		this.setState({
			imageUrl,
			pokemonId,
			id,
			name,
			japanese,
			romaji,
			specie,
			description,
			types,
			stats: {
				hp,
				attack,
				defense,
				speed,
				specialAttack,
				specialDefense,
			},
			height,
			weight,
		});
	}

	// Funções piticas

	onInputChange(event) {
		this.setState({
			input: event.target.value.toLowerCase(),
		});
	}

	componentDidMount() {
		this.loadPokemon();
	}

	onSubmitForm() {
		this.loadPokemon();
	}

	render() {
		return (
			<>
				<Header>
					<h1>Pokédex</h1>
					<SearchBar>
						<input
							id="myInput"
							type="text"
							name="search"
							placeholder="Insert a pokemon name or id"
							value={this.state.search}
							onChange={this.onInputChange}
						/>
						<button type="submit" name="button" onClick={this.onSubmitForm} />
					</SearchBar>
				</Header>

				<Content artwork={this.state.imageUrl}>
					<Wrapper>
						<PokemonPicture artwork={this.state.imageUrl} />
					</Wrapper>
					<PokemonInfo>
						<JapaneseName lang="ja" title={this.state.romaji}>
							{this.state.japanese}
						</JapaneseName>
						<PokemonName>
							{this.state.name}
							<PokemonSpecies>{this.state.specie}</PokemonSpecies>
						</PokemonName>

						<Description>{this.state.description}</Description>
						{/* 						<SubTitle>Base stats</SubTitle>
						<Stats>
							<div>
								<h4>hp</h4>
								<p>{this.state.stats.hp}</p>
							</div>

							<div>
								<h4>atk</h4>
								<p>{this.state.stats.attack}</p>
							</div>

							<div>
								<h4>def</h4>
								<p>{this.state.stats.defense}</p>
							</div>

							<div>
								<h4>sp. atk</h4>
								<p>{this.state.stats.specialAttack}</p>
							</div>

							<div>
								<h4>sp. def</h4>
								<p>{this.state.stats.specialDefense}</p>
							</div>

							<div>
								<h4>speed</h4>
								<p>{this.state.stats.speed}</p>
							</div>
						</Stats> */}
						<SubTitle>{`Type(s)`}</SubTitle>
						<PokemonTypeWrapper>
							{this.state.types.map((type) => (
								<PokemonType
									key={type}
									style={{ backgroundColor: `#${type_colors[type]}` }}>
									{type}
								</PokemonType>
							))}
						</PokemonTypeWrapper>

						<SubTitle>Other information</SubTitle>
						<Stats>
							<div>
								<h4>Id</h4>
								<span>
									{`#${
										this.state.id < 100
											? this.state.id > 10
												? "0" + this.state.id
												: "00" + this.state.id
											: this.state.id
									}`}
								</span>
							</div>
							<div>
								<h4>height</h4>
								<p>{this.state.height}m</p>
							</div>
							<div>
								<h4>weight</h4>
								<p>{this.state.weight}kg</p>
							</div>
						</Stats>
						{/*<Nav>*/}
						{/*    <ul>*/}
						{/*        <li>&lt; previous</li>*/}
						{/*        <li>next &gt;</li>*/}
						{/*    </ul>*/}
						{/*</Nav>*/}
					</PokemonInfo>
				</Content>
				<Footer>
					Feito por{" "}
					<a href="http://tozeos.dev.br" target="_blank" rel="noreferrer">
						tozeos
					</a>
					. Dados retirados da{" "}
					<a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
						PokéAPI
					</a>
					. Link para o{" "}
					<a
						href="https://github.com/tozeos/pokedex"
						target="_blank"
						rel="noreferrer">
						{" "}
						repositório
					</a>
					.
				</Footer>
			</>
		);
	}
}

const Header = styled.header`
	background-color: ${colors.white};
	color: ${colors.primary};
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	height: 150px;
	border-bottom: 5px solid ${colors.primary};

	h1 {
		font-size: 36px;
		text-transform: uppercase;
		user-select: none;
	}

	@media (max-width: 900px) {
		display: flex;
		flex-direction: column;
	}
`;

const SearchBar = styled.div`
	height: 40px;
	width: 730px;
	display: flex;
	justify-items: center;

	input {
		width: 100%;
		height: inherit;
		padding-left: 15px;
		border: 2px solid ${colors.primary};
		border-radius: 5px 0 0 5px;
		font-weight: 600;
		color: ${colors.primary};

		&:focus {
			outline: none;
		}
	}

	button {
		border: none;
		border-radius: 0 5px 5px 0;
		height: inherit;
		width: 50px;
		background: ${colors.primary} url(${search}) no-repeat center;
		cursor: pointer;

		&:hover {
			background-color: rgba(112, 43, 254, 0.8);
		}
	}

	@media (max-width: 900px) {
		width: 100%;
		padding: 0 20px;
	}
`;

const Content = styled.main`
	padding: 90px 0;

	background-position: center;
	background-image: cover;
	color: ${colors.white};
	display: flex;
	justify-content: center;
	gap: 70px;
	min-height: 100vh;

	@media (max-width: 900px) {
		display: flex;
		flex-direction: column;
		padding: 40px 0;
		gap: 20px;
	}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const PokemonPicture = styled.div`
	background-color: ${colors.primary};
	background-image: url(${pokeball});
	background-repeat: no-repeat;
	background-position: center;
	width: 350px;
	height: 350px;
	margin: 50px 0px 50px 0px;
	border-radius: 6rem 0.2rem;
	position: relative;

	&:before {
		content: "";
		width: 400px;
		height: 400px;
		background-image: url(${(props) => props.artwork});
		background-position: 100% 50%;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		position: absolute;

		@media (max-width: 900px) {
			width: 300px;
			height: 300px;
		}
	}

	@media (max-width: 900px) {
		width: 300px;
		height: 300px;
		margin: 0 auto;
		border-radius: 2rem 0.2rem;
	}
`;

const PokemonTypeWrapper = styled.div`
	display: flex;
`;

const PokemonType = styled.span`
	text-transform: uppercase;
	text-align: center;
	font-size: 14px;
	padding: 5px 30px;
	width: 100%;
	margin-right: 5px;
	border-radius: 10px 2px;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
`;

const PokemonInfo = styled.div`
	height: 450px;
	width: 460px;

	@media (max-width: 900px) {
		width: 100%;
		height: fit-content;
		padding: 0 20px;
	}
`;

const JapaneseName = styled.span`
	font-size: 18px;
	color: ${colors.primary};
`;

const PokemonName = styled.h2`
	color: ${colors.primary};
	text-transform: uppercase;
	font-size: 48px;
	line-height: 2rem;

	span {
		color: ${colors.gray2};
	}

	@media (max-width: 900px) {
		font-size: 36px;
	}
`;

const PokemonSpecies = styled.p`
	font-size: 1.3rem;
	color: ${colors.primary};
	padding-bottom: 1rem;
`;

const SubTitle = styled.h3`
	font-size: 14px;
	color: ${colors.primary};
	text-transform: uppercase;
	padding-top: 20px;
`;

const Description = styled.p`
	font-size: 1.5rem;
	line-height: 2rem;
	font-weight: 700;
	background-color: ${colors.primary};
	border-radius: 2rem 0.2rem;
	padding: 15px;
`;

const Stats = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 5px;

	div {
		background-color: ${colors.primary};
		border-radius: 10px 2px;
		min-width: 73px;
		height: 60px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		h4 {
			color: ${colors.white};
			text-transform: uppercase;
			font-size: 12px;
		}

		p {
			text-transform: uppercase;
			margin: 0 10px;
		}
	}
`;

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
`;

const Footer = styled.footer`
	background: ${colors.primary};
	color: ${colors.white};
	font-size: 14px;
	font-weight: 600;

	a {
		color: #f7d060;
		text-decoration: none;
	}

	padding: 20px;
`;
