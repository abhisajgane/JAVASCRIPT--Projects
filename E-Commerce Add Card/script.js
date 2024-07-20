
    const prices = {
        blueZara: 45,
        greenZara: 30
    };

    function updateQuantity(id, change) {
        const quantityInput = document.getElementById(id);
        let quantity = parseInt(quantityInput.value) + change;
        if (quantity < 1) quantity = 1;
        quantityInput.value = quantity;
        updatePrice(id, quantity);
    }

    function updatePrice(id, quantity) {
        const priceSpan = document.getElementById(id + 'Price');
        priceSpan.textContent = `$${prices[id] * quantity}`;
        updateTotal();
    }

    function updateTotal() {
        const blueZaraQuantity = parseInt(document.getElementById('blueZara').value);
        const greenZaraQuantity = parseInt(document.getElementById('greenZara').value);
        const productAmount = prices.blueZara * blueZaraQuantity + prices.greenZara * greenZaraQuantity;
        document.getElementById('productAmount').textContent = `$${productAmount}`;
        document.getElementById('totalAmount').textContent = `$${productAmount + 50}`;
    }

    document.getElementById('applyPromo').addEventListener('click', function() {
        const promoCode = document.getElementById('promo').value;
        const promoMessage = document.getElementById('promoMessage');
        if (promoCode === 'ABHI') {
            promoMessage.classList.remove('hidden');
        } else {
            promoMessage.classList.add('hidden');
        }
    });

    updateTotal();