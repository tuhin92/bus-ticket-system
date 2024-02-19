document.addEventListener('DOMContentLoaded', function() {
    const seatButtons = document.querySelectorAll('#seat');
    const selectedSeatCountElement = document.getElementById('selected-seat-count');
    const seatsLeftSpan = document.getElementById('seats-left');
    const seatDetailsContainer = document.getElementById('seatDetails');
    const cartPriceElement = document.getElementById('cart-price');
    const couponInput = document.getElementById('couponInput');
    const applyButton = document.getElementById('applyButton');
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
        updateCouponFieldStatus(); 
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

        let totalPrice = 0; 

        // Display seat details for each selected seat
        selectedSeats.forEach(seatName => {
            const seatDetails = document.createElement('div');
            seatDetails.className = 'flex justify-between font-inter text-lg seat-details';
            seatDetails.innerHTML = `<p>${seatName}</p><p>Economy</p><p>550</p>`;
            seatDetailsContainer.appendChild(seatDetails);

            totalPrice += 550; 
        });

        // Add horizontal line if there are selected seats
        if (selectedSeats.length > 0) {
            const hrElement = document.createElement('hr');
            seatDetailsContainer.appendChild(hrElement);

            // Add total price element before the cart price
            const totalPriceElement = document.createElement('div');
            totalPriceElement.className = 'flex justify-between font-inter font-bold text-lg'; 
            totalPriceElement.innerHTML = `
                <p>Total Price</p>
                <p id="totalPrice">BDT <span>${totalPrice}</span></p>
            `;
            seatDetailsContainer.appendChild(totalPriceElement); 
        }

        seatDetailsContainer.style.display = 'block';
    }

    // Function to update coupon field status
    function updateCouponFieldStatus() {
        if (selectedSeatCount === 4) {
            couponInput.disabled = false;
            applyButton.disabled = false;
            couponInput.style.backgroundColor = ''; 
            couponInput.style.color = ''; 
        } else {
            couponInput.disabled = true;
            applyButton.disabled = true;
            couponInput.style.backgroundColor = '#f2f2f2'; 
            couponInput.style.color = '#666666';
        }
    }

    // Function to apply coupon and calculate discounted price
    function applyCoupon() {
        const couponCode = couponInput.value.trim();
        const totalPriceElement = document.getElementById('totalPrice');
        const totalPriceSpan = totalPriceElement.querySelector('span');
        const totalPrice = parseFloat(totalPriceSpan.innerText);

        let discount = 0;

        switch (couponCode) {
            case "NEW15":
                discount = totalPrice * 0.15;
                break;
            case "Couple 20":
                discount = totalPrice * 0.20;
                break;
            default:
                alert("Invalid coupon code");
                return;
        }

        // Calculate Grand Total
        const grandTotal = totalPrice - discount;

        // Update the content of the grand total element
        const grandTotalElement = document.getElementById('grandTotalValue');
        if (grandTotalElement) {
            grandTotalElement.textContent = grandTotal;
        }

        // Display discount amount
        const discountElement = document.createElement('div');
        discountElement.className = 'font-inter font-bold text-lg text-red-500'; 
        discountElement.textContent = `Discount BDT  ${discount.toFixed(2)}`;
        seatDetailsContainer.appendChild(discountElement);
        
        // Hide the coupon input and apply button
        const couponLabel = document.querySelector('.input.input-bordered');
        couponLabel.style.display = 'none';
    }
 
    
    // Attach click event listeners to seat buttons
    seatButtons.forEach(function(seatButton) {
        seatButton.addEventListener('click', handleSeatSelection);
    });

    // Attach click event listener to apply button
    applyButton.addEventListener('click', applyCoupon);
});
