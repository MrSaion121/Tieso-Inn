document.addEventListener('DOMContentLoaded', function () {
    const reservationForm = document.getElementById('reservation-form');
    const arrivalDateInput = document.getElementById('arrival_date');
    const checkoutDateInput = document.getElementById('checkout_date');
    const numGuestInput = document.getElementById('num_of_guest');

    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");

    const handleReservation = async (event) => {
        event.preventDefault();

        const currentUrl = window.location.href;
        
        const arrival_date = arrivalDateInput.value;
        const checkout_date = checkoutDateInput.value;
        const num_of_guest = numGuestInput.value;
        const reservation_num = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase;
        const room_id = currentUrl.split('/').pop();

        console.log(`Room ID: ${room_id}`)


        const reservationData = { reservation_num, user_id, room_id, arrival_date, checkout_date, num_of_guest };

        try {
            const response = await fetch(`/reservations?userId=${user_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(reservationData)
            });

            if (response.ok) {
                const data = await response.json();



                alert('Reservación exitosa');
                window.location.href = '/';
            } else {
                const data = await response.json();
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error de red: ', error);
            alert('Error al crear la reservación, por favor intente nuevamente');
        }

    };

    reservationForm.addEventListener('submit', handleReservation);
});