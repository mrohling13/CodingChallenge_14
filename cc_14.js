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

  
