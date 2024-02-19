document.addEventListener('DOMContentLoaded', function() {
    const seatButtons = document.querySelectorAll('#seat');
    const selectedSeatCountElement = document.getElementById('selected-seat-count');
    const seatsLeftSpan = document.getElementById('seats-left');
    const seatDetailsContainer = document.getElementById('seatDetails');
    const cartPriceElement = document.getElementById('cart-price'); // Assuming you have an element with id 'cart-price'
    let selectedSeatCount = 0;
    let seatsLeft = 40;
    const selectedSeats = [];

    // Function to handle seat selection
    function handleSeatSelection(event) {
        const seatButton = event.target;
        const isSelected = seatButton.classList.contains('selected');

        if (!isSelected && selectedSeatCount < 4 && seatsLeft > 0) {
            seatButton.classList.add('selected');
            seatButton.style.backgroundColor = '#1DD100';
            seatButton.style.color = '#FFFFFF';
            selectedSeatCount++;
            seatsLeft--;
            selectedSeats.push(seatButton.textContent);
        } else if (isSelected) {
            seatButton.classList.remove('selected');
            seatButton.style.backgroundColor = '';
            seatButton.style.color = '';
            selectedSeatCount--;
            seatsLeft++;
            const index = selectedSeats.indexOf(seatButton.textContent);
            if (index > -1) {
                selectedSeats.splice(index, 1);
            }
        } else {
            alert('You can only select up to 4 seats.');
        }

        updateSelectedSeatCount();
        updateSeatDetails();
    }

    // Function to update selected seat count
    function updateSelectedSeatCount() {
        selectedSeatCountElement.innerHTML = `Seat<span class="bg-[#1DD100] text-[12px] font-bold text-[#FFFFFF] px-2 rounded-full">${selectedSeatCount}</span>`;
        seatsLeftSpan.textContent = seatsLeft;
    }

    // Function to update seat details
    function updateSeatDetails() {
        // Clear previous seat details
        seatDetailsContainer.innerHTML = '';

        let totalPrice = 0; // Initialize total price

        // Display seat details for each selected seat
        selectedSeats.forEach(seatName => {
            const seatDetails = document.createElement('div');
            seatDetails.className = 'flex justify-between font-inter text-sm seat-details'; // Increased font size to text-sm
            seatDetails.innerHTML = `<p>${seatName}</p><p>Economy</p><p>550</p>`;
            seatDetailsContainer.appendChild(seatDetails);

            totalPrice += 550; // Add seat price to total price
        });

        // Add horizontal line if there are selected seats
        if (selectedSeats.length > 0) {
            const hrElement = document.createElement('hr');
            seatDetailsContainer.appendChild(hrElement);

            // Add total price element before the cart price
            const totalPriceElement = document.createElement('div');
            totalPriceElement.className = 'flex justify-between font-inter font-bold text-lg'; // Increased font size to text-lg
            totalPriceElement.innerHTML = `
                <p>Total Price</p>
                <p>BDT <span>${totalPrice}</span></p>
            `;
            seatDetailsContainer.appendChild(totalPriceElement); // Append total price element
        }

        seatDetailsContainer.style.display = 'block';
    }

    // Attach click event listeners to seat buttons
    seatButtons.forEach(function(seatButton) {
        seatButton.addEventListener('click', handleSeatSelection);
    });
});
