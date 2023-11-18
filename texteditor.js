    function replaceBr(text) {
        return text.replace(/\{br\}/g, '<br>');
    }

    function replaceDynamicBr(text) {
        if (window.innerWidth > 450) {
            return text.replace(/\{dbr\}/g, '<br>');
        } else {
            return text.replace(/\{dbr\}/g, '');
        }
    }

    function replaceMobileBr(text) {
        if (window.innerWidth < 450) {
            return text.replace(/\{mbr\}/g, '<br>');
        } else {
            return text.replace(/\{mbr\}/g, '');
        }
    }

    function processTextOnPage() {
        var allElements = document.getElementsByTagName('*');

        for (var i = 0; i < allElements.length; i++) {
            var element = allElements[i];

            if (element.nodeType === 3) { // Текстовый узел
                var newText = replaceBr(element.nodeValue);
                newText = replaceDynamicBr(newText);
                newText = replaceMobileBr(newText);

                if (newText !== element.nodeValue) {
                    element.nodeValue = newText;
                }
            } else if (element.nodeType === 1) { // Элемент
                if (element.tagName !== 'SCRIPT' && element.tagName !== 'STYLE') {
                    var newInnerHTML = replaceBr(element.innerHTML);
                    newInnerHTML = replaceDynamicBr(newInnerHTML);
                    newInnerHTML = replaceMobileBr(newInnerHTML);

                    if (newInnerHTML !== element.innerHTML) {
                        element.innerHTML = newInnerHTML;
                    }
                }
            }
        }
    }

    window.onload = processTextOnPage;
    window.onresize = processTextOnPage;
