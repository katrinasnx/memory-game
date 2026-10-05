const header = document.createElement("header");
document.body.appendChild(header);
const h1 = document.createElement("h1");
header.appendChild(h1);
h1.textContent = "Memory game";
const menu = document.createElement("menu");
header.appendChild(menu);
const btnNewGame = document.createElement("button");
const btnLeaders = document.createElement("button");
btnNewGame.classList.add("btnNewGame");
btnLeaders.classList.add("btnLeaders");
menu.appendChild(btnNewGame);
menu.appendChild(btnLeaders);
btnNewGame.textContent = "New game";
btnLeaders.textContent = "Leaders";

const main = document.createElement("main");
document.body.appendChild(main);
const field = document.createElement("div");
field.classList.add("field");
main.appendChild(field);
const section = document.createElement("section");
main.appendChild(section);

const moves = document.createElement("h2");
section.appendChild(moves);
moves.textContent = `Moves: 0`;
const find = document.createElement("h2");
section.appendChild(find);
find.textContent = `Find: 0/8`;

const cards = [
	{ id: 1, name: "card1", img: "cards/card1.png" },
	{ id: 2, name: "card2", img: "cards/card2.png" },
	{ id: 3, name: "card3", img: "cards/card3.png" },
	{ id: 4, name: "card4", img: "cards/card4.png" },
	{ id: 5, name: "card5", img: "cards/card5.png" },
	{ id: 6, name: "card6", img: "cards/card6.png" },
	{ id: 7, name: "card7", img: "cards/card7.png" },
	{ id: 8, name: "card8", img: "cards/card8.png" },
];

const dublicatedPhotos = [...cards, ...cards].map((item) => ({ ...item }));

function mixedCards() {
	for (let i = dublicatedPhotos.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[dublicatedPhotos[i], dublicatedPhotos[j]] = [
			dublicatedPhotos[j],
			dublicatedPhotos[i],
		];
	}
}

function renderBoard() {
	field.replaceChildren();

	dublicatedPhotos.forEach((x) => {
		const card = document.createElement("div");
		card.classList.add("card");
		card.dataset.name = x.name;

		const front = document.createElement("div");
		front.classList.add("front");

		const img = document.createElement("img");
		img.src = x.img;
		img.alt = x.name;
		front.appendChild(img);

		const back = document.createElement("div");
		back.classList.add("back");

		card.appendChild(front);
		card.appendChild(back);

		field.appendChild(card);
	});
}
mixedCards();
renderBoard();

	let hasFlippedCard = false;
	let lockBoard = false;
	let firstCard;
	let secondCard;
	let score = 0;
	let move = 0;

	field.addEventListener("click", (event) => {
		const clickedCard = event.target.closest(".card");

		if (!clickedCard) return;
		if (lockBoard) return;
		if (clickedCard === firstCard) return;
		if (clickedCard.classList.contains("flipped")) return;

		clickedCard.classList.add("flipped");

		if (hasFlippedCard == false) {
			hasFlippedCard = true;
			firstCard = clickedCard;
			return;
		}

		secondCard = clickedCard;

		move++;
		moves.textContent = `Moves: ${move}`;

		checkCards();
	});



function checkCards() {
	let isMatch = firstCard.dataset.name === secondCard.dataset.name;

	if (isMatch) {
		disableCards();
		score++;
		find.textContent = `Find: ${score}/8`;
		if (score === 8) {
			endGame();
		}
	} else {
		unflipCards();
	}
}

function disableCards() {
	hasFlippedCard = false;
	lockBoard = false;
	firstCard = null;
	secondCard = null;
}

function unflipCards() {
	lockBoard = true;

	setTimeout(() => {
		firstCard.classList.remove("flipped");
		secondCard.classList.remove("flipped");
		disableCards();
	}, 700);
}

btnNewGame.addEventListener("click", () => {
	const allCards = document.querySelectorAll(".card");

	allCards.forEach((card) => {
		card.classList.remove("flipped");
	});
	disableCards();
	score = 0;
	move = 0;
	moves.textContent = `Moves: 0`;
	find.textContent = `Find: 0/8`;

    setTimeout(()=>{
        mixedCards();
        renderBoard();
    }, 500);

});

function endGame() {
	let leaderBoard = JSON.parse(localStorage.getItem("leaderBoard")) || [];

	const autoName = `player${leaderBoard.length + 1}`;

	const newRecord = {
		name: autoName,
		moves: move,
	};

	leaderBoard.push(newRecord);
	localStorage.setItem("leaderBoard", JSON.stringify(leaderBoard));

	console.log(`${autoName} + ${move}`);

	endWindow(move);
}

function endWindow(currentMoves) {
	const modalEnd = document.createElement("div");
	main.appendChild(modalEnd);
	modalEnd.classList.add("modalEnd");

	modalEnd.classList.add("show");

	const end = document.createElement("div");
	modalEnd.appendChild(end);
	end.classList.add("end");

	const winText = document.createElement("h2");
	winText.textContent = `You did it in ${currentMoves} moves!`;
	end.appendChild(winText);

	const btnCloseEnd = document.createElement("button");

	end.appendChild(btnCloseEnd);
	btnCloseEnd.classList.add("btnCloseEnd");
	btnCloseEnd.textContent = "Close";

	btnCloseEnd.addEventListener("click", () => {
		modalEnd.classList.remove("show");
		modalEnd.remove();
	});
}

const modalBack = document.createElement("div");
main.appendChild(modalBack);
modalBack.classList.add("modalBack");
const modalLeaders = document.createElement("div");
modalBack.appendChild(modalLeaders);
modalLeaders.classList.add("modalLeaders");

const btnClose = document.createElement("button");
modalLeaders.appendChild(btnClose);
btnClose.classList.add("btnClose");
btnClose.textContent = "Close";
const leaderCap = document.createElement("h2");
leaderCap.textContent= "TOP leaders";
modalLeaders.appendChild(leaderCap);
const table = document.createElement("div");
modalLeaders.appendChild(table);

btnLeaders.addEventListener("click", () => {
	modalBack.classList.toggle("show");

	if (modalBack.classList.contains("show")) {
		table.replaceChildren();

		let leaderBoard = JSON.parse(localStorage.getItem("leaderBoard")) || [];

		leaderBoard.sort((a, b) => a.moves - b.moves);

		if (leaderBoard.length === 0) {
			const emptyMessage = document.createElement("p");
			emptyMessage.textContent = "at this time there are not any players";
			table.appendChild(emptyMessage);
			return;
		}

		leaderBoard.forEach((player, index) => {
			const row = document.createElement("h3");
			row.classList.add("table-row");

			row.textContent = `${index + 1}. ${player.name} : ${player.moves} moves`;
			table.appendChild(row);
		});
	}
});

btnClose.addEventListener("click", () => {
	modalBack.classList.remove("show");
});
