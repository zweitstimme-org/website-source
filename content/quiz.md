---
title: "Tippspiel"
layout: "page"
summary: "Häufige Fragen"
url: "/quiz"
---
<div id="password-form" style="max-width: 300px; margin: 50px auto; text-align: center;">
  <h3>Passwort erforderlich</h3>
  <input type="password" id="password-input" 
         style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px;"
         placeholder="Passwort eingeben">
  <button onclick="checkPassword()" 
          style="width: 100%; padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
    Zugang
  </button>
  <p id="password-error" style="color: red; display: none; margin-top: 10px;">
    Falsches Passwort
  </p>
</div>

<style>
  .quiz-form .form-container {
    max-width: 600px;
    margin: 0 auto;
  }
  .quiz-form .form-section {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  .quiz-form .form-section h3 {
    margin-bottom: 10px;
    font-size: 1.2em;
    color: #333;
  }
  .quiz-form label {
    display: inline-block;
    width: 120px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .quiz-form input[type="text"] {
    width: 100%;
    margin-bottom: 15px;
    padding: 5px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 30px;
    font-size: 16px;
  }
  .party-slider {
    flex: 1;
    margin-bottom: 15px;
  }
  .percentage-input {
    width: 85px;
    padding: 2px 20px 2px 8px;
    text-align: right;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    -webkit-appearance: textfield;
    position: relative;
    font-size: 16px;
    height: 28px;
    line-height: 28px;
  }
  /* Style the spinner buttons */
  .percentage-input::-webkit-outer-spin-button,
  .percentage-input::-webkit-inner-spin-button {
    -webkit-appearance: inner-spin-button;
    opacity: 1;
    position: relative;
    height: 80%;
    width: 16px;
    right: -10px;
    cursor: pointer;
    display: block;
    background: #f0f0f0;
    border-left: 1px solid #ccc;
    margin-top: 2px;
  }
  /* Firefox specific styles */
  .percentage-input {
    -moz-appearance: textfield;
  }
  .percentage-input:hover::-webkit-inner-spin-button {
    background-color: #e0e0e0;
  }
  .percentage-input:active::-webkit-inner-spin-button {
    background-color: #d0d0d0;
  }
  .slider-container {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 32px;
  }
  #total {
    font-weight: bold;
  }
  .quiz-form button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .quiz-form button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  .time-error {
    color: red;
    font-size: 0.9em;
    margin-top: 5px;
    display: none;
  }
  p.total {
    text-align: right;
    margin-top: 20px;
    font-size: 1.1em;
  }
  .progress-container {
    width: 100%;
    height: 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
    margin: 20px 0;
    overflow: hidden;
  }
  .progress-bar {
    height: 100%;
    background-color: #4CAF50;
    width: 0%;
    transition: width 0.3s ease;
  }
  .progress-bar.over {
    background-color: #ff4444;
  }
  .warning {
    color: red;
    text-align: center;
    margin-top: 10px;
    font-weight: bold;
    display: none;
  }
  .field-error {
    border-color: red !important;
  }
  .validation-summary {
    color: red;
    margin: 20px 0;
    padding: 10px;
    border: 1px solid red;
    border-radius: 4px;
    display: none;
  }
  .time-input {
    width: 50px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    font-size: 16px;
    font-family: monospace;
    text-align: center;
  }
  .time-separator {
    margin: 0 2px;
    font-family: monospace;
    font-size: 16px;
  }
  .party-slider-container {
    background: #f9f9f9;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
    border-left: 5px solid #999; /* Default color */
  }
  .party-slider-container:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  .party-logo {
    width: 30px;
    height: 30px;
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .party-cdu .party-logo {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23000000'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='30' fill='white' text-anchor='middle'%3ECDU%3C/text%3E%3C/svg%3E");
  }
  .party-spd .party-logo {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23E3000F'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='30' fill='white' text-anchor='middle'%3ESPD%3C/text%3E%3C/svg%3E");
  }
  .party-gruene .party-logo {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%2346962b'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='20' fill='white' text-anchor='middle'%3EGrüne%3C/text%3E%3C/svg%3E");
  }
  .party-fdp .party-logo {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23FFED00'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='30' fill='%23333' text-anchor='middle'%3EFDP%3C/text%3E%3C/svg%3E");
  }
  .party-afd .party-logo {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23009EE0'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='30' fill='white' text-anchor='middle'%3EAfD%3C/text%3E%3C/svg%3E");
  }
  .party-linke .party-logo {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23BE3075'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='25' fill='white' text-anchor='middle'%3ELinke%3C/text%3E%3C/svg%3E");
  }
  .party-bsw .party-logo {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23E3000F'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='30' fill='white' text-anchor='middle'%3EBSW%3C/text%3E%3C/svg%3E");
  }
  .party-sonstige .party-logo {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23999999'/%3E%3Ctext x='50' y='55' font-family='Arial' font-size='50' fill='white' text-anchor='middle'%3E...%3C/text%3E%3C/svg%3E");
  }
  /* Casino-style animations */
  @keyframes jackpot {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  .jackpot {
    animation: jackpot 0.5s ease;
  }
  /* Confetti animation for form submission */
  .confetti {
    position: fixed;
    width: 15px;
    height: 15px;
    pointer-events: none;
    z-index: 1000;
  }
  @keyframes confetti-slow {
    0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
    100% { transform: translate3d(25px, 105vh, 0) rotateX(360deg) rotateY(180deg); }
  }
  @keyframes confetti-medium {
    0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
    100% { transform: translate3d(100px, 105vh, 0) rotateX(100deg) rotateY(360deg); }
  }
  @keyframes confetti-fast {
    0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
    100% { transform: translate3d(-50px, 105vh, 0) rotateX(10deg) rotateY(250deg); }
  }
  /* Progress bar enhancement */
  .progress-container {
    background: repeating-linear-gradient(
      45deg,
      #f0f0f0,
      #f0f0f0 10px,
      #e5e5e5 10px,
      #e5e5e5 20px
    );
  }
  .progress-bar {
    background: linear-gradient(45deg, #4CAF50, #45a049);
    box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .success-message {
    animation: slideIn 0.5s ease-out;
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  /* Enhanced party container hover effect */
  .party-slider-container {
    transform-origin: left center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .party-slider-container:hover {
    transform: translateX(10px) scale(1.02);
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  }
  /* Progress bar pulse animation when near 100% */
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(76, 175, 80, 0); }
    100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
  }
  .progress-bar.near-complete {
    animation: pulse 2s infinite;
  }
  /* Party logo spin on hover */
  .party-logo {
    transition: transform 0.3s ease;
  }
  .party-slider-container:hover .party-logo {
    transform: rotate(360deg);
  }
  /* Rainbow gradient effect for 100% */
  .progress-bar.complete {
    background: linear-gradient(
      45deg,
      #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8f00ff
    );
    background-size: 200% 200%;
    animation: rainbow 2s linear infinite;
  }
  @keyframes rainbow {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  /* Floating effect for party containers */
  .party-slider-container {
    animation: float 6s ease-in-out infinite;
    animation-delay: calc(var(--animation-order) * 0.2s);
  }
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0px); }
  }
  /* Glowing effect when near target */
  .party-slider-container.near-target {
    box-shadow: 0 0 15px rgba(76, 175, 80, 0.5);
    transition: box-shadow 0.3s ease;
  }
  /* Slot machine effect for numbers */
  @keyframes slot-machine {
    0% { transform: translateY(-20px); opacity: 0; }
    20% { transform: translateY(0); opacity: 1; }
    80% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(20px); opacity: 0; }
  }
  .percentage-input.updating {
    position: relative;
  }
  .percentage-input.updating::after {
    content: attr(data-value);
    position: absolute;
    left: 0;
    animation: slot-machine 0.3s ease-out;
  }
  /* Party color borders */
  .party-cdu { border-left-color: #000000; }
  .party-spd { border-left-color: #E3000F; }
  .party-gruene { border-left-color: #46962b; }
  .party-fdp { border-left-color: #FFED00; }
  .party-afd { border-left-color: #009EE0; }
  .party-linke { border-left-color: #BE3075; }
  .party-bsw { border-left-color: #E3000F; }
  .party-sonstige { border-left-color: #999999; }
  /* Dice rolling animation for random button */
  .dice-button {
    position: relative;
    padding: 10px 20px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;
    margin: 10px 0;
  }
  .dice-button::after {
    content: '🎲';
    position: absolute;
    right: 10px;
    animation: roll 1s linear infinite;
  }
  @keyframes roll {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  /* Updated ballot box button styles */
  .ballot-button-container {
    position: relative;
    width: 100%;
    height: 120px;
    perspective: 1000px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .ballot-box {
    position: absolute;
    bottom: 0;
    width: 120px;
    height: 100px;
    background: #4a4a4a;
    border-radius: 10px;
    overflow: visible;
    cursor: pointer;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    color: white;
    font-weight: bold;
    padding-bottom: 10px;
    transform: none;
    z-index: 1;
  }
  .ballot-box::before {
    content: "Absenden";
    position: absolute;
    bottom: 10px;
    font-size: 14px;
  }
  .ballot-box:hover {
    transform: scale(1.05);
  }
  .ballot-slot {
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 8px;
    background: #2a2a2a;
    border-radius: 4px;
    box-shadow: inset 0 2px 5px rgba(0,0,0,0.5);
  }
  /* Reset and override ballot button styles */
  .ballot-button-container button.submit-ballot {
    all: unset; /* Reset all styles */
    position: absolute;
    top: 0;
    width: 60px !important; /* Force width */
    height: 40px !important; /* Force height */
    background: white;
    border: 2px solid #4CAF50;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(45deg, #fff 85%, #e0e0e0 90%);
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
    transform: none;
    margin: 0 auto;
    z-index: 2;
    display: block !important;
    padding: 0 !important;
    min-width: 0 !important;
    max-width: 60px !important;
    box-sizing: border-box !important;
  }
  /* Keep the cross styling */
  .ballot-button-container button.submit-ballot::before,
  .ballot-button-container button.submit-ballot::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 2px;
    background-color: #4CAF50;
  }
  .ballot-button-container button.submit-ballot::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .ballot-button-container button.submit-ballot::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  .submit-ballot:hover {
    transform: translateY(-5px);
  }
  .submit-ballot.submitting {
    animation: submitBallot 1s forwards;
  }
  @keyframes submitBallot {
    0% {
      transform: translateY(0) rotate(0);
    }
    50% {
      transform: translateY(30px) rotate(10deg);
    }
    80% {
      transform: translateY(60px) rotate(-10deg) scale(0.8);
      opacity: 1;
    }
    100% {
      transform: translateY(80px) rotate(0) scale(0.5);
      opacity: 0;
    }
  }
  /* Confetti burst from ballot box */
  @keyframes ballotConfetti {
    0% {
      transform: translateY(0) rotate(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) rotate(360deg);
      opacity: 0;
    }
  }
  .ballot-confetti {
    position: absolute;
    bottom: 80px;
    width: 8px;
    height: 8px;
    opacity: 0;
  }
  /* Enhanced Matrix digital rain effect */
  .matrix-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: black;
    opacity: 0.25; /* Increased from 0.15 for more visibility */
    pointer-events: none;
  }
  .matrix-column {
    position: absolute;
    top: -1000px;
    font-family: monospace;
    font-size: 20px; /* Increased from 16px */
    color: #0F0;
    text-shadow: 0 0 8px #0F0, 0 0 12px #0F0; /* Enhanced glow effect */
    white-space: pre;
    opacity: 0;
    animation: matrix-rain linear infinite;
    transform-style: preserve-3d;
  }
  @keyframes matrix-rain {
    0% {
      transform: translateY(0) translateZ(0);
      opacity: 0;
    }
    5% {
      opacity: 0.8;
    }
    95% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(calc(100vh + 1000px)) translateZ(100px);
      opacity: 0;
    }
  }
  /* Add floating effect to characters */
  .matrix-char {
    display: block;
    animation: float-char 1.5s ease-in-out infinite;
    animation-delay: var(--delay);
  }
  @keyframes float-char {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(5px);
    }
  }
  /* Style for election words in matrix */
  .matrix-word {
    display: block;
    color: #0F0;
    text-shadow: 0 0 8px #0F0, 0 0 12px #0F0;
    font-weight: bold;
    animation: float-char 1.5s ease-in-out infinite;
    animation-delay: var(--delay);
    opacity: 0.9; /* Make words slightly more visible */
  }
  /* Make post header completely transparent */
  .post-header {
    opacity: 0.7;
    transition: opacity 0.3s ease;
    background: transparent !important;
  }
  .post-header:hover {
    opacity: 1;
  }
  /* Mobile-specific layouts */
  @media screen and (max-width: 768px) {
    /* Adjust party slider containers for mobile */
    .slider-container {
      flex-direction: column;
      gap: 5px;
    }
    
    .slider-container label {
      width: auto;
      margin-bottom: 8px;
    }
    
    .percentage-input {
      width: 100%;
      max-width: 120px;
      margin-bottom: 8px;
    }
    
    .party-slider {
      width: 100%;
    }
    
    /* Adjust time input container for mobile */
    .slider-container:has(.time-input) {
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .slider-container:has(.time-input) label {
      width: 100%;
      margin-bottom: 10px;
    }
    
    .time-input {
      margin-top: 5px;
    }
    
    /* Optional: increase touch targets for mobile */
    .time-input {
      height: 40px;
      width: 60px;
    }
    
    .time-separator {
      font-size: 20px;
      margin: 0 5px;
      line-height: 40px;
    }
  }
</style>
<script>
  function checkPassword() {
    const password = document.getElementById('password-input').value;
    const error = document.getElementById('password-error');
    const content = document.getElementById('protected-content');
    const form = document.getElementById('password-form');
    
    if (password === "forsa") {
      content.style.display = "block";
      form.style.display = "none";
      error.style.display = "none";
      // Add validation listeners after showing content
      document.getElementById('name').addEventListener('blur', validateName);
      document.getElementById('affiliation').addEventListener('blur', validateTeam);
    } else {
      error.style.display = "block";
      document.getElementById('password-input').value = '';
    }
  }

  // Allow Enter key to submit
  document.getElementById('password-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      checkPassword();
    }
  });

  function updateSlider(partyId) {
    const input = document.getElementById(partyId + '-input');
    const slider = document.getElementById(partyId);
    const currentTotal = calculateTotalExcept(partyId);
    const newValue = parseFloat(input.value);
    
    // Limit the new value to not exceed 100% total
    if (currentTotal + newValue > 100) {
      input.value = (100 - currentTotal).toFixed(1);
      slider.value = (100 - currentTotal) * 10;
    } else {
      slider.value = newValue * 10;
    }
    
    updateTotal();
  }

  function updateInput(partyId) {
    const slider = document.getElementById(partyId);
    const input = document.getElementById(partyId + '-input');
    const currentTotal = calculateTotalExcept(partyId);
    const newValue = slider.value / 10;
    
    // Limit the new value to not exceed 100% total
    if (currentTotal + newValue > 100) {
      const maxAllowed = 100 - currentTotal;
      slider.value = maxAllowed * 10;
      input.value = maxAllowed.toFixed(1);
    } else {
      input.value = newValue.toFixed(1);
    }
    
    updateTotal();
  }

  // Helper function to calculate total excluding a specific party
  function calculateTotalExcept(excludePartyId) {
    const sliders = document.querySelectorAll('.party-slider');
    let total = 0;
    sliders.forEach(slider => {
      if (slider.id !== excludePartyId) {
        total += parseFloat(slider.value) / 10;
      }
    });
    return total;
  }

  // Add event listeners to prevent slider dragging beyond 100%
  document.querySelectorAll('.party-slider').forEach(slider => {
    slider.addEventListener('mousedown', function() {
      const partyId = this.id;
      const currentTotal = calculateTotalExcept(partyId);
      
      // Set max value dynamically based on remaining percentage
      const maxAllowed = (100 - currentTotal) * 10;
      this.max = maxAllowed;
    });
  });

  function updateTotal() {
    const sliders = document.querySelectorAll('.party-slider');
    let total = 0;
    sliders.forEach(slider => {
      const value = parseFloat(slider.value) / 10;
      total += value;
    });
    document.getElementById('total').innerText = total.toFixed(1);
    const warning = document.getElementById('warning');
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = Math.min(total, 100) + '%';
    progressBar.classList.toggle('over', total > 100);
    
    if (total > 100) {
      document.getElementById('total').style.color = 'red';
      progressBar.classList.remove('near-complete');
    } else if (Math.abs(total - 100) < 0.01) {
      document.getElementById('total').style.color = 'green';
      progressBar.classList.add('jackpot');
      progressBar.classList.remove('near-complete');
      createConfetti();
      playJackpotSound();
      progressBar.classList.add('complete');
    } else if (total > 95) { // Add pulse animation when getting close
      document.getElementById('total').style.color = 'black';
      progressBar.classList.add('near-complete');
    } else {
      document.getElementById('total').style.color = 'black';
      progressBar.classList.remove('near-complete');
    }
  }

  function validateTime() {
    const hours = parseInt(document.getElementById('hours').value);
    const minutes = parseInt(document.getElementById('minutes').value);
    const seconds = parseInt(document.getElementById('seconds').value);
    const timeError = document.getElementById('time-error');
    
    // Validate and constrain input values
    if (hours > 23) document.getElementById('hours').value = '23';
    if (minutes > 59) document.getElementById('minutes').value = '59';
    if (seconds > 59) document.getElementById('seconds').value = '59';
    
    // Add leading zeros
    document.getElementById('hours').value = hours.toString().padStart(2, '0');
    document.getElementById('minutes').value = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').value = seconds.toString().padStart(2, '0');
    
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const minSeconds = 18 * 3600 + 1; // 18:00:01
    
    if (totalSeconds <= 18 * 3600) {
      timeError.style.display = 'block';
      timeError.innerText = 'Zeit muss nach 18:00:00 liegen';
      document.getElementById('hours').classList.add('field-error');
      document.getElementById('minutes').classList.add('field-error');
      document.getElementById('seconds').classList.add('field-error');
    } else {
      timeError.style.display = 'none';
      document.getElementById('hours').classList.remove('field-error');
      document.getElementById('minutes').classList.remove('field-error');
      document.getElementById('seconds').classList.remove('field-error');
    }
  }

  function updateTurnoutSlider() {
    const input = document.getElementById('turnout-input');
    const slider = document.getElementById('turnout');
    slider.value = parseFloat(input.value) * 10;
    validateTurnout();
  }

  function updateTurnoutInput() {
    const slider = document.getElementById('turnout');
    const input = document.getElementById('turnout-input');
    input.value = (slider.value / 10).toFixed(1);
    validateTurnout();
  }

  function validateTurnout() {
    const value = parseFloat(document.getElementById('turnout-input').value);
    const error = document.getElementById('turnout-error');
    if (value <= 0 || value > 100) {
      error.style.display = 'block';
      error.innerText = 'Wahlbeteiligung muss zwischen 0% und 100% liegen';
      document.getElementById('turnout').classList.add('field-error');
      document.getElementById('turnout-input').classList.add('field-error');
    } else {
      error.style.display = 'none';
      document.getElementById('turnout').classList.remove('field-error');
      document.getElementById('turnout-input').classList.remove('field-error');
    }
  }

  function validateForm(event) {
    event.preventDefault();
    const validationSummary = document.getElementById('validation-summary');
    const errors = [];
    
    // Check name
    const name = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (!name.value.trim()) {
      errors.push('Name muss ausgefüllt werden');
      name.classList.add('field-error');
      nameError.style.display = 'block';
      nameError.innerText = 'Name muss ausgefüllt werden';
    } else {
      name.classList.remove('field-error');
      nameError.style.display = 'none';
    }
    
    // Check team selection
    const affiliation = document.getElementById('affiliation');
    const affiliationError = document.getElementById('affiliation-error');
    if (!affiliation.value) {
      errors.push('Team muss ausgewählt werden');
      affiliation.classList.add('field-error');
      affiliationError.style.display = 'block';
      affiliationError.innerText = 'Team muss ausgewählt werden';
    } else {
      affiliation.classList.remove('field-error');
      affiliationError.style.display = 'none';
    }
    
    // Check percentages
    const total = parseFloat(document.getElementById('total').innerText);
    if (total !== 100) {
      errors.push('Summe muss 100% ergeben');
      const warning = document.getElementById('warning');
      warning.style.display = 'block';
      warning.innerText = total > 100 
        ? 'Summe muss 100% ergeben'
        : 'Summe muss 100% ergeben';
    } else {
      warning.style.display = 'none';
    }
    
    // Check turnout
    const turnout = parseFloat(document.getElementById('turnout-input').value);
    const turnoutError = document.getElementById('turnout-error');
    if (turnout <= 0 || turnout > 100) {
      errors.push('Wahlbeteiligung muss zwischen 0% und 100% liegen');
      document.getElementById('turnout').classList.add('field-error');
      document.getElementById('turnout-input').classList.add('field-error');
      turnoutError.style.display = 'block';
      turnoutError.innerText = 'Wahlbeteiligung muss zwischen 0% und 100% liegen';
    } else {
      document.getElementById('turnout').classList.remove('field-error');
      document.getElementById('turnout-input').classList.remove('field-error');
      turnoutError.style.display = 'none';
    }
    
    // Check time
    const hours = parseInt(document.getElementById('hours').value);
    const minutes = parseInt(document.getElementById('minutes').value);
    const seconds = parseInt(document.getElementById('seconds').value);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const timeError = document.getElementById('time-error');
    if (totalSeconds <= 18 * 3600) {
      errors.push('Zeit muss nach 18:00:00 liegen');
      document.getElementById('hours').classList.add('field-error');
      document.getElementById('minutes').classList.add('field-error');
      document.getElementById('seconds').classList.add('field-error');
      timeError.style.display = 'block';
      timeError.innerText = 'Zeit muss nach 18:00:00 liegen';
    } else {
      document.getElementById('hours').classList.remove('field-error');
      document.getElementById('minutes').classList.remove('field-error');
      document.getElementById('seconds').classList.remove('field-error');
      timeError.style.display = 'none';
    }
    
    if (errors.length > 0) {
      validationSummary.innerHTML = '<strong>Bitte korrigieren Sie folgende Fehler:</strong><br>' + 
        errors.join('<br>');
      validationSummary.style.display = 'block';
      document.getElementById('submit-button').scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      validationSummary.style.display = 'none';
      // Animate ballot submission
      const submitButton = document.querySelector('.submit-ballot');
      submitButton.classList.add('submitting');
      
      // Add active state to ballot box
      const ballotBox = document.querySelector('.ballot-box');
      ballotBox.style.transform = 'scale(0.95)';
      setTimeout(() => {
        ballotBox.style.transform = 'none';
      }, 200);

      // Create confetti burst from ballot box
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          const confetti = document.createElement('div');
          confetti.className = 'ballot-confetti';
          confetti.style.left = `${Math.random() * 60 + 20}%`;
          confetti.style.backgroundColor = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'][Math.floor(Math.random() * 4)];
          confetti.style.animation = `ballotConfetti ${Math.random() * 0.5 + 0.5}s ease-out forwards`;
          document.querySelector('.ballot-button-container').appendChild(confetti);
          setTimeout(() => confetti.remove(), 1000);
        }
      }, 800);

      // Continue with form submission after animation
      setTimeout(() => {
        // Collect all form data
        const formData = {
          name: document.getElementById('name').value.trim(),
          affiliation: document.getElementById('affiliation').value,
          parties: {
            cdu: parseFloat(document.getElementById('cdu-input').value),
            afd: parseFloat(document.getElementById('afd-input').value),
            gru: parseFloat(document.getElementById('gruene-input').value),
            spd: parseFloat(document.getElementById('spd-input').value),
            lin: parseFloat(document.getElementById('linke-input').value),
            bsw: parseFloat(document.getElementById('bsw-input').value),
            oth: parseFloat(document.getElementById('sonstige-input').value),
            fdp: parseFloat(document.getElementById('fdp-input').value)
          },
          turnout: parseFloat(document.getElementById('turnout-input').value),
          firstProjection: {
            hours: parseInt(document.getElementById('hours').value),
            minutes: parseInt(document.getElementById('minutes').value),
            seconds: parseInt(document.getElementById('seconds').value)
          },
          timestamp: new Date().toISOString()
        };

        // Send data to API
        fetch('https://polsci.uni-wh.de/quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Try to parse as JSON, but don't fail if it's not JSON
          return response.text().then(text => {
            try {
              return JSON.parse(text);
            } catch (e) {
              return { message: text };
            }
          });
        })
        .then(data => {
          const formContainer = document.querySelector('.form-container');
          formContainer.innerHTML = `
            <div class="success-message" style="text-align: center; padding: 40px 20px;">
              <h3 style="color: #4CAF50; margin-bottom: 20px;">Ihre Schätzung wurde erfolgreich gespeichert!</h3>
              <p>Vielen Dank für Ihre Teilnahme am Tippspiel.</p>
              <p>Die Auswertung erfolgt nach der Wahl.</p>
            </div>
          `;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(error => {
          console.error('Error:', error);
          validationSummary.innerHTML = '<strong>Fehler beim Speichern:</strong><br>' + 
            'Es gab einen Fehler beim Speichern Ihrer Schätzung. ' +
            'Bitte versuchen Sie es später erneut oder kontaktieren Sie uns, falls der Fehler bestehen bleibt.';
          validationSummary.style.display = 'block';
          document.getElementById('submit-button').scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      }, 1200);
    }
  }

  function validateName() {
    const name = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (!name.value.trim()) {
      name.classList.add('field-error');
      nameError.style.display = 'block';
      nameError.innerText = 'Name muss ausgefüllt werden';
    } else {
      name.classList.remove('field-error');
      nameError.style.display = 'none';
    }
  }

  function validateTeam() {
    const affiliation = document.getElementById('affiliation');
    const affiliationError = document.getElementById('affiliation-error');
    if (!affiliation.value) {
      affiliation.classList.add('field-error');
      affiliationError.style.display = 'block';
      affiliationError.innerText = 'Team muss ausgewählt werden';
    } else {
      affiliation.classList.remove('field-error');
      affiliationError.style.display = 'none';
    }
  }

  function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const shapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      
      // Random position
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-20px';
      
      // Random color
      const color = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.backgroundColor = color;
      
      // Random shape
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      if (shape === 'circle') {
        confetti.style.borderRadius = '50%';
      } else if (shape === 'triangle') {
        confetti.style.width = '0';
        confetti.style.height = '0';
        confetti.style.backgroundColor = 'transparent';
        confetti.style.borderLeft = '5px solid transparent';
        confetti.style.borderRight = '5px solid transparent';
        confetti.style.borderBottom = `10px solid ${color}`;
      }
      
      // Random animation
      const animations = ['confetti-slow', 'confetti-medium', 'confetti-fast'];
      const animation = animations[Math.floor(Math.random() * animations.length)];
      confetti.style.animation = `${animation} ${Math.random() * 3 + 2}s linear forwards`;
      
      document.body.appendChild(confetti);
      
      // Remove confetti after animation
      setTimeout(() => confetti.remove(), 5000);
    }
  }

  function playJackpotSound() {
    const audio = new Audio('/sounds/success.mp3');
    audio.play().catch(() => {}); // Ignore if browser blocks autoplay
  }

  // Add sound effects for interactions
  function playInteractionSound() {
    const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAUAAAiSAAYGBgYJCQkJCQwMDAwMDw8PDw8SEhISEhUVFRUVGBgYGBgbGxsbGx4eHh4eISEhISEkJCQkJCcnJycnKioqKiotLS0tLTAwMDAwMzMzMzM2NjY2Njk5OTk5PT09PT0//8AAABQTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRPAAADSAAAAABMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NCxFUAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=');
    audio.volume = 0.2;
    audio.play().catch(() => {});
  }

  // Add click sound to party containers
  document.querySelectorAll('.party-slider-container').forEach(container => {
    container.addEventListener('click', playInteractionSound);
  });

  // Add random distribution button
  function addRandomButton() {
    const button = document.createElement('button');
    button.className = 'dice-button';
    button.textContent = 'Zufällige Verteilung';
    button.onclick = generateRandomDistribution;
    document.querySelector('.form-section').appendChild(button);
  }

  function generateRandomDistribution() {
    const parties = ['cdu', 'spd', 'gruene', 'fdp', 'afd', 'linke', 'bsw', 'sonstige'];
    let remaining = 100;
    
    // Generate random values that sum to 100
    parties.forEach((party, index) => {
      if (index === parties.length - 1) {
        // Last party gets remainder
        document.getElementById(party + '-input').value = remaining.toFixed(1);
        document.getElementById(party).value = remaining * 10;
      } else {
        const max = remaining - (parties.length - index - 1) * 5; // Ensure minimum 5% for remaining
        const value = Math.random() * Math.min(max - 5, 30); // Max 30% per party
        remaining -= value;
        document.getElementById(party + '-input').value = value.toFixed(1);
        document.getElementById(party).value = value * 10;
      }
      // Add slot machine effect
      const input = document.getElementById(party + '-input');
      input.classList.add('updating');
      input.setAttribute('data-value', input.value);
      setTimeout(() => input.classList.remove('updating'), 300);
    });
    
    updateTotal();
  }

  // Initialize floating animation delays
  document.querySelectorAll('.party-slider-container').forEach((container, index) => {
    container.style.setProperty('--animation-order', index);
  });

  // Add glow effect when party percentage is near a target value
  function checkTargetProximity(partyId, value) {
    const targets = {
      'cdu': 30,
      'spd': 15,
      'gruene': 12,
      // ... add target values for other parties
    };
    
    if (Math.abs(value - targets[partyId]) < 2) {
      document.querySelector(`.party-${partyId}`).classList.add('near-target');
    } else {
      document.querySelector(`.party-${partyId}`).classList.remove('near-target');
    }
  }

  // Add click handler for ballot box
  document.addEventListener('DOMContentLoaded', function() {
    const ballotBox = document.querySelector('.ballot-box');
    ballotBox.addEventListener('click', function() {
      const form = document.querySelector('form');
      const submitEvent = new Event('submit');
      form.dispatchEvent(submitEvent);
    });
  });

  // Enhanced Matrix digital rain effect
  function createMatrixRain() {
    const bg = document.createElement('div');
    bg.className = 'matrix-bg';
    document.body.appendChild(bg);

    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ%€$@#';
    const words = [
      'Zweitstimme',
      'Bundestagswahl',
      'Wahlkreis',
      'Erststimme',
      'Hochrechnung',
      'Prognose',
      'Wahlergebnis',
      'Wahlbeteiligung',
      'Direktmandat',
      'Überhangmandat',
      'Sperrklausel',
      'Bundestag',
      'Wahlurne',
      'Stimmzettel',
      'Wahllokal',
      'Briefwahl',
      'Sonntagsfrage',
      'Umfrage',
      'Koalition',
      'Politik'
    ];
    const columnCount = Math.floor(window.innerWidth / 25);

    for (let i = 0; i < columnCount; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      
      // Random properties for each column
      const speed = 5 + Math.random() * 8;
      const delay = Math.random() * 5;
      const length = 15 + Math.floor(Math.random() * 20);
      
      // Create the string of characters with individual spans
      let text = '';
      for (let j = 0; j < length; j++) {
        // 10% chance to insert a word instead of a random character
        if (Math.random() < 0.1 && j < length - 5) {
          const word = words[Math.floor(Math.random() * words.length)];
          text += `<span class="matrix-word" style="--delay: ${j * 0.1}s">${word}</span>`;
          j += word.length - 1; // Skip characters based on word length
        } else {
          const char = characters[Math.floor(Math.random() * characters.length)];
          text += `<span class="matrix-char" style="--delay: ${j * 0.1}s">${char}</span>`;
        }
      }
      
      column.innerHTML = text;
      column.style.left = (i * 25) + 'px';
      column.style.animationDuration = speed + 's';
      column.style.animationDelay = delay + 's';
      
      bg.appendChild(column);
    }

    // Periodically update characters and words
    setInterval(() => {
      document.querySelectorAll('.matrix-char, .matrix-word').forEach(span => {
        if (Math.random() < 0.01) { // 1% chance to change
          if (span.classList.contains('matrix-word') && Math.random() < 0.5) {
            // 50% chance to replace word with another word
            span.textContent = words[Math.floor(Math.random() * words.length)];
          } else {
            // Replace with random character
            span.textContent = characters[Math.floor(Math.random() * characters.length)];
          }
        }
      });
    }, 100);
  }

  // Initialize matrix effect when content is shown
  document.addEventListener('DOMContentLoaded', function() {
    const passwordForm = document.getElementById('password-form');
    const originalCheckPassword = window.checkPassword;
    
    window.checkPassword = function() {
      originalCheckPassword();
      if (document.getElementById('protected-content').style.display === 'block') {
        createMatrixRain();
      }
    };
  });

  // Recreate matrix effect on window resize
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      const bg = document.querySelector('.matrix-bg');
      if (bg) {
        bg.remove();
        createMatrixRain();
      }
    }, 250);
  });
</script>
<div id="protected-content" style="display: none;">
  <div class="quiz-form">
    <div class="form-container">
      <form onsubmit="validateForm(event)" novalidate>
        <div class="form-section">
          <h3>Teilnehmerinformationen</h3>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required 
                 oninput="validateName()"
                 onblur="validateName()"
                 novalidate>
          <p id="name-error" class="warning"></p>
        </div>
        <div class="form-section">
          <label for="affiliation">Team:</label>
          <select id="affiliation" name="affiliation" required
                  oninput="validateTeam()"
                  onblur="validateTeam()"
                  novalidate>
            <option value="">Team auswählen...</option>
            <option value="mannheim">Universität Mannheim</option>
            <option value="hertie">Hertie School</option>
            <option value="witten">Universität Witten/Herdecke</option>
          </select>
          <p id="affiliation-error" class="warning"></p>
        </div>
        <div class="form-section">
          <h3>Zweitstimmen-Ergebnis Schätzung</h3>
          <div class="slider-container party-slider-container party-cdu">
            <span class="party-logo"></span>
            <label for="cdu">CDU/CSU:</label>
            <input type="number" id="cdu-input" class="percentage-input" min="0" max="100" value="0.0" step="0.1" oninput="updateSlider('cdu')">
            <input type="range" id="cdu" class="party-slider" min="0" max="1000" value="0" oninput="updateInput('cdu')">
          </div>
          <div class="slider-container party-slider-container party-spd">
            <span class="party-logo"></span>
            <label for="spd">SPD:</label>
            <input type="number" id="spd-input" class="percentage-input" min="0" max="100" value="0.0" step="0.1" oninput="updateSlider('spd')">
            <input type="range" id="spd" class="party-slider" min="0" max="1000" value="0" oninput="updateInput('spd')">
          </div>
          <div class="slider-container party-slider-container party-gruene">
            <span class="party-logo"></span>
            <label for="gruene">Grüne:</label>
            <input type="number" id="gruene-input" class="percentage-input" min="0" max="100" value="0.0" step="0.1" oninput="updateSlider('gruene')">
            <input type="range" id="gruene" class="party-slider" min="0" max="1000" value="0" oninput="updateInput('gruene')">
          </div>
          <div class="slider-container party-slider-container party-fdp">
            <span class="party-logo"></span>
            <label for="fdp">FDP:</label>
            <input type="number" id="fdp-input" class="percentage-input" min="0" max="100" value="0.0" step="0.1" oninput="updateSlider('fdp')">
            <input type="range" id="fdp" class="party-slider" min="0" max="1000" value="0" oninput="updateInput('fdp')">
          </div>
          <div class="slider-container party-slider-container party-afd">
            <span class="party-logo"></span>
            <label for="afd">AfD:</label>
            <input type="number" id="afd-input" class="percentage-input" min="0" max="100" value="0.0" step="0.1" oninput="updateSlider('afd')">
            <input type="range" id="afd" class="party-slider" min="0" max="1000" value="0" oninput="updateInput('afd')">
          </div>
          <div class="slider-container party-slider-container party-linke">
            <span class="party-logo"></span>
            <label for="linke">Die Linke:</label>
            <input type="number" id="linke-input" class="percentage-input" min="0" max="100" value="0.0" step="0.1" oninput="updateSlider('linke')">
            <input type="range" id="linke" class="party-slider" min="0" max="1000" value="0" oninput="updateInput('linke')">
          </div>
          <div class="slider-container party-slider-container party-bsw">
            <span class="party-logo"></span>
            <label for="bsw">BSW:</label>
            <input type="number" id="bsw-input" class="percentage-input" min="0" max="100" value="0.0" step="0.1" oninput="updateSlider('bsw')">
            <input type="range" id="bsw" class="party-slider" min="0" max="1000" value="0" oninput="updateInput('bsw')">
          </div>
          <div class="slider-container party-slider-container party-sonstige">
            <span class="party-logo"></span>
            <label for="sonstige">Sonstige:</label>
            <input type="number" id="sonstige-input" class="percentage-input" min="0" max="100" value="0.0" step="0.1" oninput="updateSlider('sonstige')">
            <input type="range" id="sonstige" class="party-slider" min="0" max="1000" value="0" oninput="updateInput('sonstige')">
          </div>
          <div class="progress-container">
            <div id="progress-bar" class="progress-bar"></div>
          </div>
          <p class="total">Gesamt: <span id="total">0</span>%</p>
          <p id="warning" class="warning"></p>
        </div>
        <div class="form-section">
          <h3>Wahlbeteiligung</h3>
          <div class="slider-container">
            <label for="turnout">Prozent:</label>
            <input type="number" 
                   id="turnout-input" 
                   class="percentage-input" 
                   min="0" 
                   max="100" 
                   value="0.0" 
                   step="0.1" 
                   oninput="updateTurnoutSlider()">
            <input type="range" 
                   id="turnout" 
                   class="party-slider" 
                   min="0" 
                   max="1000" 
                   value="0" 
                   oninput="updateTurnoutInput()">
          </div>
          <p id="turnout-error" class="warning"></p>
        </div>
        <div class="form-section">
          <h3>Zeitpunkt der ersten Hochrechnung</h3>
          <div class="slider-container">
            <label for="hochrechnung-time">Zeit:</label>
            <input type="number" 
                   id="hours" 
                   class="time-input" 
                   min="0"
                   value="18" 
                   oninput="validateTime()" 
                   onblur="validateTime()"
                   required>
            <span class="time-separator">:</span>
            <input type="number" 
                   id="minutes" 
                   class="time-input" 
                   min="0"
                   value="00" 
                   oninput="validateTime()" 
                   onblur="validateTime()"
                   required>
            <span class="time-separator">:</span>
            <input type="number" 
                   id="seconds" 
                   class="time-input" 
                   min="0"
                   value="00" 
                   oninput="validateTime()" 
                   onblur="validateTime()"
                   required>
            <span style="margin-left: 10px; color: #666;">(nach 18 Uhr)</span>
          </div>
          <p id="time-error" class="warning"></p>
        </div>
        <div id="validation-summary" class="validation-summary"></div>
        <div class="ballot-button-container">
          <button type="submit" class="submit-ballot"></button>
          <div class="ballot-box">
            <div class="ballot-slot"></div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

