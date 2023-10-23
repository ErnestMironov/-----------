export default function splitTextToSMS(text: string): string[] {
    let maxSMSLength: number = 140;
    const words: string[] = text.split(' ');
    
    const processWords = (maxLength: number): string[] => {
        let smsArray: string[] = [];
        let currentSMS: string = '';
        for (let word of words) {
            let potentialSMS: string = currentSMS + (currentSMS ? ' ' : '') + word;
            if (potentialSMS.length <= maxLength) {
                currentSMS = potentialSMS;
            } else {
                smsArray.push(currentSMS);
                currentSMS = word;
            }
        }
        smsArray.push(currentSMS);  // Add the remaining text
        return smsArray;
    };
    
    let smsArray: string[] = processWords(maxSMSLength);
    
    if (smsArray.length > 1) {
        let totalFragments: number = smsArray.length;
        let suffixLength: number = (' ' + totalFragments + '/' + totalFragments).length;
        maxSMSLength -= suffixLength;
        
        // Re-process the smsArray with the adjusted max length
        smsArray = processWords(maxSMSLength);
        totalFragments = smsArray.length;  // Recalculate total fragments
        
        // Adding the suffix
        smsArray = smsArray.map((sms, index) =>
            sms + ' ' + (index + 1) + '/' + totalFragments
        );
    }

    return smsArray;
}

// A meaningful excerpt in Russian for testing
const text = `Время — это великий учитель, но, увы, оно убивает своих учеников. Эти слова принадлежат знаменитому французскому композитору Гектору Берлиозу. Каждый момент нашей жизни уникален. Если человек упустил момент, то вернуть его уже невозможно. Время не ждет Оно идет своим чередом. Время — это великий учитель, но, увы, оно убивает своих учеников. Эти слова принадлежат  знаменитому французскому композитору Гектору Берлиозу. Каждый момент нашей жизни уникален. Если человек упустил момент,  то вернуть его уже невозможно. Время не ждет. Оно идет своим чередом. Время — это великий учитель, но, увы, оно убивает  своих учеников. Эти слова принадлежат знаменитому французскому композитору Гектору Берлиозу. Каждый момент нашей жизни уникален. Если человек упустил момент, то вернуть его уже невозможно. Время не ждет. Оно идет своим чередом.`;

// Test the function with the provided text
const result = splitTextToSMS(text);
console.log(result);
