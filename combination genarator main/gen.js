
function generateCombinations() {
    var inputItems = document.getElementById('inputItems').value;
    var desiredItems = document.getElementById('desiredItems').value;

    var items = inputItems.split(/\s+/); // Split by spaces

    var combinations = generateCombinationsHelper(items, parseInt(desiredItems));

    // Display input items in a table
    var inputTableElement = document.getElementById('inputTable');
    inputTableElement.innerHTML = '<table><tr><th>Input Items</th></tr>';

    inputTableElement.innerHTML += '<tr><td>[' + items.join(', ') + ']</td></tr>';
    inputTableElement.innerHTML += '</table>';

    // Display results as a 9*n array
    var resultElement = document.getElementById('result');
    resultElement.innerHTML = '';

    combinations.forEach(function(combination) {
        var div = document.createElement('div');
        div.className = 'array vertical';
        
        combination.forEach(function(item) {
            var itemDiv = document.createElement('div');
            itemDiv.textContent = item;
            div.appendChild(itemDiv);
        });

        div.style.border = '1px solid #ddd';
        div.style.padding = '15px';
        div.style.margin = '10px';
        div.style.backgroundColor = '#f5f5f5';
        div.style.borderRadius = '8px';
        div.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        div.style.transition = 'background-color 0.3s';

        div.addEventListener('mouseover', function() {
            div.style.backgroundColor = '#e0e0e0';
        });

        div.addEventListener('mouseout', function() {
            div.style.backgroundColor = '#f5f5f5';
        });

        resultElement.appendChild(div);
    });

    // Display stats
    var statsElement = document.getElementById('stats');
    statsElement.innerHTML = '<p>Total Number of Input: ' + items.length + '</p>';
    statsElement.innerHTML += '<p>Total Number of Combinations: ' + combinations.length + '</p>';
}

function generateCombinationsHelper(items, desiredItems) {
    var combinations = [];

    if (items.length < desiredItems) {
        return combinations; // Not enough items for desired items
    }

    generateCombinationsRecursive(combinations, [], items, desiredItems, 0);

    return combinations;
}

function generateCombinationsRecursive(combinations, current, remaining, desiredItems, index) {
    if (current.length === desiredItems) {
        combinations.push([...current]);
        return;
    }

    for (var i = index; i < remaining.length; i++) {
        var item = remaining[i];
        current.push(item);

        generateCombinationsRecursive(combinations, current, remaining, desiredItems, i + 1);

        current.pop();
    }
}

function printResults() {
    var printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print Results</title></head><body>');
    printWindow.document.write('<h1> Your Results</h1>');

    var resultElement = document.getElementById('result');
    var combinations = resultElement.getElementsByClassName('array');
    
    Array.from(combinations).forEach(function(combination) {
        printWindow.document.write('<div style="border: 1px solid #ddd; padding: 15px; margin: 10px; background-color: #f5f5f5; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); display: inline-block;">');
        
        var numbers = combination.getElementsByTagName('div');
        Array.from(numbers).forEach(function(number) {
            printWindow.document.write('<div>' + number.textContent + '</div>');
        });
        
        printWindow.document.write('</div>');
    });

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}
