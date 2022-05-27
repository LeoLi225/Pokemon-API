hasFlippedCard = false;
lockBoard = false;
firstCard = undefined;
secondCard = undefined;
pairsFound = 0;

function setup1() {

    // loadCards();
    // console.log(list.length);
    // console.log(pairsFound);

    $(".card").on("click",function () {
        if(lockBoard) return;
        if(this == firstCard) return;
        if(!this.classList.contains("flip")){
        $(this).toggleClass("flip")

        if (!hasFlippedCard) {
            firstCard = $(this).find('.front_face')[0]
            hasFlippedCard = true;
        } else {
            // 2nd card
            secondCard = $(this).find('.front_face')[0]
            console.log(firstCard, secondCard);
            hasFlippedCard = false;
            checkForMatch();
        }
}})

    function checkForMatch() {
        // check if you have match
        if (
            $(`#${firstCard.id}`).attr("src") ==
            $(`#${secondCard.id}`).attr("src")
        ) {
            console.log("A Match!");
            pairsFound++;
            if (pairsFound * 2 == list.length) {
                disableCards();
                alert("Win");
            } else {
                disableCards();
            }


        } else {
            console.log("not a Match!");
            unflipCards();
        }
    }

    function disableCards() {
        $(`#${firstCard.id}`).parent().off("click")
        $(`#${secondCard.id}`).parent().off("click")
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            $(`#${firstCard.id}`).parent().removeClass("flip")
            $(`#${secondCard.id}`).parent().removeClass("flip")
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
}

$(document).ready(setup1)