<script>
        document.addEventListener('DOMContentLoaded', function() {
            const sendButton = document.getElementById('send-money');
            const popupOverlay = document.getElementById('popup-overlay');
            const upiPopup = document.getElementById('upi-popup');
            const closePopup = document.getElementById('close-popup');
            const successAmount = document.getElementById('success-amount');
            const successRecipient = document.getElementById('success-recipient');
            const amountInput = document.getElementById('amount');
            const senderInput = document.getElementById('sender');
            const recipientInput = document.getElementById('recipient');
            const recipientDropdown = document.getElementById('recipient-dropdown');
            const cancelUpi = document.getElementById('cancel-upi');
            const confirmUpi = document.getElementById('confirm-upi');
            const qrRecipient = document.getElementById('qr-recipient');
            const qrRecipientName = document.getElementById('qr-recipient-name');
            const qrAmount = document.getElementById('qr-amount');
            const qrTransaction = document.getElementById('qr-transaction');
            
        
            const FIXED_AMOUNT = 230.00;
            
            
            function generateTransactionId() {
                return 'FP' + new Date().getFullYear() + Math.floor(100000 + Math.random() * 900000);
            }
            
            
            recipientInput.addEventListener('click', function() {
                recipientDropdown.classList.toggle('active');
            });
            
            
            document.addEventListener('click', function(event) {
                if (!event.target.closest('.recipient-selector')) {
                    recipientDropdown.classList.remove('active');
                }
            });
            
            
            document.querySelectorAll('.recipient-option').forEach(option => {
                option.addEventListener('click', function() {
                    recipientInput.value = this.getAttribute('data-value');
                    recipientDropdown.classList.remove('active');
                });
            });
            
            
            sendButton.addEventListener('click', function() {
        
                if (!recipientInput.value) {
                    alert('Please select a recipient');
                    recipientInput.focus();
                    return;
                }
                
                if (!senderInput.value.trim()) {
                    alert('Please enter your name');
                    senderInput.focus();
                    return;
                }
                
            
                const transactionId = generateTransactionId();
                
                
                qrRecipient.textContent = recipientInput.value;
                qrRecipientName.textContent = recipientInput.value;
                qrAmount.textContent = '₹' + FIXED_AMOUNT.toFixed(2);
                qrTransaction.textContent = transactionId;
                
    
                upiPopup.classList.add('active');
            });
            
        
            closePopup.addEventListener('click', function() {
                popupOverlay.classList.remove('active');
            });
        
        
            cancelUpi.addEventListener('click', function() {
                upiPopup.classList.remove('active');
            });
            
            confirmUpi.addEventListener('click', function() {
        
                upiPopup.classList.remove('active');
                
            
                successAmount.textContent = '₹' + FIXED_AMOUNT.toFixed(2);
                successRecipient.textContent = recipientInput.value;
                popupOverlay.classList.add('active');
                
                
                addTransaction(senderInput.value, FIXED_AMOUNT, recipientInput.value);
                
            
                senderInput.value = '';
            });
            
            
            function addTransaction(sender, amount, recipient) {
                const transactionList = document.querySelector('.transaction-list');
                const newTransaction = document.createElement('li');
                newTransaction.className = 'transaction-item';
                
                const now = new Date();
                const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                const dateString = now.toLocaleDateString('en-US', options);
                
                newTransaction.innerHTML = `
                    <div>
                        <div>${sender} → ${recipient}</div>
                        <div class="transaction-date">${dateString}</div>
                    </div>
                    <div class="transaction-amount positive">+₹${parseFloat(amount).toFixed(2)}</div>
                `;
                
            
                transactionList.insertBefore(newTransaction, transactionList.firstChild);
            }
        });
    </script>