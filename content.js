// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action === "analyze") {
//     const text = document.body.innerText;
//     sendResponse({text: text});
//   }
  
//   if (request.action === "highlight") {
//     request.terms.forEach(term => {
//       const regex = new RegExp(term, 'gi');
//     //   document.body.innerHTML = document.body.innerHTML.replace(
//     //     regex, 
//     //     match => `<span style="background-color: yellow; font-weight: bold;">${match}</span>`
//     //   );

//     function highlightTerms(term) {
//   const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
//   const regex = new RegExp(term, 'gi');
  
//   while (walker.nextNode()) {
//     const node = walker.currentNode;
//     if (regex.test(node.nodeValue)) {
//       const span = document.createElement('span');
//       span.innerHTML = node.nodeValue.replace(regex, (match) => 
//         `<span style="background-color: yellow; font-weight: bold;">${match}</span>`
//       );
//       node.parentNode.replaceChild(span, node);
//     }
//   }
// }

//     });
//   }
// });







chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "analyze") {
    const text = document.body.innerText;
    sendResponse({ text: text });
  }

  if (request.action === "highlight") {
    request.terms.forEach(term => highlightTerms(term));
  }
});

function highlightTerms(term) {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  const regex = new RegExp(term, 'gi');

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (regex.test(node.nodeValue)) {
      const span = document.createElement('span');
      span.innerHTML = node.nodeValue.replace(regex, (match) =>
        `<span style="background-color: yellow; font-weight: bold;">${match}</span>`
      );
      node.parentNode.replaceChild(span, node);
    }
  }
}










