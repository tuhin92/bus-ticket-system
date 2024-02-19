document.addEventListener('DOMContentLoaded', function() {
    const seatButtons = document.querySelectorAll('#seat');
    const selectedSeatCountElement = document.getElementById('selected-seat-count');
    const seatsLeftSpan = document.getElementById('seats-left');
    let selectedSeatCount = 0;
    let seatsLeft = 40;

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
        } else if (isSelected) {
            seatButton.classList.remove('selected');
            seatButton.style.backgroundColor = '';
            seatButton.style.color = '';
            selectedSeatCount--;
            seatsLeft++;
        }

        updateSelectedSeatCount();
    }



    // Function to update selected seat count
    function updateSelectedSeatCount() {
        selectedSeatCountElement.innerHTML = `Seat<span class="bg-[#1DD100] text-[12px] font-bold text-[#FFFFFF] px-2 rounded-full">${selectedSeatCount}</span>`;
        seatsLeftSpan.textContent = seatsLeft;
    }

    // Attach click event listeners to seat buttons
    seatButtons.forEach(function(seatButton) {
        seatButton.addEventListener('click', handleSeatSelection);
    });
});
