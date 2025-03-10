// Task 2 - Support Tickets Dynamic Addition
function createSupportTicket(customer, issue, priority) {
    let divTicketContainer = document.getElementById('ticketContainer');
    const ticketCard = document.createElement('div');
    ticketCard.setAttribute('class', 'ticket-card');
  
    const custName = document.createElement('h2');
    custName.setAttribute('class', 'ticket-header');
    custName.textContent = customer;
    ticketCard.appendChild(custName);
  
    const issueDesc = document.createElement('p');
    issueDesc.setAttribute('class', 'issue-description');
    issueDesc.textContent = issue;
    ticketCard.appendChild(issueDesc);
  
    const priorityLabel = document.createElement('p');
    priorityLabel.setAttribute('class', 'priority-label');
    priorityLabel.textContent = `Priority: ${priority}`;
    ticketCard.appendChild(priorityLabel);
  
    // Create Edit Button
    const editBtn = document.createElement('button');
    editBtn.setAttribute('class', 'edit-btn');
    editBtn.textContent = 'Edit';
    ticketCard.appendChild(editBtn);
  
    // Create Resolve Button
    const resolveBtn = document.createElement('button');
    resolveBtn.setAttribute('class', 'resolve-btn');
    resolveBtn.textContent = 'Resolve';
    ticketCard.appendChild(resolveBtn);
  
    // Apply priority styling
    styleSingleCard(ticketCard);
  
    // Add event listeners
    addEventListeners(ticketCard, custName, issueDesc, priorityLabel);
  
    divTicketContainer.appendChild(ticketCard);
    return ticketCard;
  }
  // Task 3 - Highlighting High Priority Tickets
function highlightHighPriorityTickets() {
    document.querySelectorAll('.ticket-card').forEach(ticket => styleSingleCard(ticket));
  }
  
  // Apply priority-based styling
  function styleSingleCard(ticket) {
    const priority = ticket.querySelector('.priority-label').textContent.replace('Priority: ', '').toLowerCase();
    ticket.classList.remove('high-priority', 'medium-priority', 'other-priority');
  
    if (priority === 'high') {
        ticket.classList.add('high-priority');
    } else if (priority === 'medium') {
        ticket.classList.add('medium-priority');
    } else {
        ticket.classList.add('other-priority');
    }
  }
// Task 4 - Support Ticket Resolution & Event Bubbling
document.getElementById('ticketContainer').addEventListener('click', (event) => {
    if (event.target.classList.contains('resolve-btn')) {
        event.target.closest('.ticket-card').remove();
        event.stopPropagation();
    }
  });

  // Task 5 - Inline Editing for Support Tickets (No innerHTML)
function enableInlineEditing(ticket, custName, issueDesc, priorityLabel) {
    ticket.querySelector('.edit-btn').addEventListener('click', () => {
        if (ticket.querySelector('.save-btn')) return;
  
        // Create input fields
        const nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        nameInput.value = custName.textContent;
  
        const issueInput = document.createElement('input');
        issueInput.setAttribute('type', 'text');
        issueInput.value = issueDesc.textContent;
  
        // Create priority dropdown
        const priorityInput = document.createElement('select');
        ['Low', 'Medium', 'High'].forEach(level => {
            let option = document.createElement('option');
            option.value = level;
            option.textContent = level;
            priorityInput.appendChild(option);
        });
        priorityInput.value = priorityLabel.textContent.replace('Priority: ', '');
  
        // Create Save button
        const saveBtn = document.createElement('button');
        saveBtn.setAttribute('class', 'save-btn');
        saveBtn.textContent = 'Save';
  
        // Clear existing elements from ticket
        ticket.innerHTML = '';
        ticket.appendChild(nameInput);
        ticket.appendChild(document.createElement('br'));
        ticket.appendChild(issueInput);
        ticket.appendChild(document.createElement('br'));
        ticket.appendChild(priorityInput);
        ticket.appendChild(document.createElement('br'));
        ticket.appendChild(saveBtn);
        ticket.appendChild(document.createElement('br'));
  
        // Save button event listener
        saveBtn.addEventListener('click', () => {
            // Update ticket details
            custName.textContent = nameInput.value;
            issueDesc.textContent = issueInput.value;
            priorityLabel.textContent = `Priority: ${priorityInput.value}`;
  
            // Restore ticket layout
            ticket.innerHTML = '';
            ticket.appendChild(custName);
            ticket.appendChild(issueDesc);
            ticket.appendChild(priorityLabel);
  
            // Re-add Edit and Resolve buttons
            const editBtn = document.createElement('button');
            editBtn.setAttribute('class', 'edit-btn');
            editBtn.textContent = 'Edit';
            ticket.appendChild(editBtn);
  
            const resolveBtn = document.createElement('button');
            resolveBtn.setAttribute('class', 'resolve-btn');
            resolveBtn.textContent = 'Resolve';
            ticket.appendChild(resolveBtn);
  
            // Reapply styling and event listeners
            styleSingleCard(ticket);
            addEventListeners(ticket, custName, issueDesc, priorityLabel);
        });
    });
  }
  
  // Helper to Add Event Listeners for Tickets
  function addEventListeners(ticket, custName, issueDesc, priorityLabel) {
    enableInlineEditing(ticket, custName, issueDesc, priorityLabel);
  }
// Load Initial Tickets
document.addEventListener('DOMContentLoaded', () => {
    const initialTickets = [
        { customer: 'Paul George', issue: 'Cannot win to save his career', priority: 'High' },
        { customer: 'Jalen Hurts', issue: 'Being a super bowl champ', priority: 'Medium' },
        { customer: 'BruceDEO', issue: 'Wont stream', priority: 'Low' }
    ];
    initialTickets.forEach(ticket => createSupportTicket(ticket.customer, ticket.issue, ticket.priority));
    highlightHighPriorityTickets();
  });
// Add New Ticket on Button Click
document.getElementById('addTicketBtn').addEventListener('click', () => {
    createSupportTicket('Malcartier', 'Drip too severe', 'High');
  });