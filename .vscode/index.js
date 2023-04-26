
const input = document.querySelector('input');
const log = document.getElementById('output');

input.addEventListener('input', async function(){
    const text = this.value;
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const link = text.match(linkRegex);
    if (link) {
      try {
        const response = await fetch(link[0]);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        console.log('Text copied to clipboard.');
        // Send text to OpenAI API
        const openAIKey = "YOUR_API_KEY";
        const summary = await fetch(`https://api.openai.com/v1/engines/davinci/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openAIKey}`
          },
          body: JSON.stringify({
            prompt: `summarize this text :${text}`,
            max_tokens: 100
          })
        });
        const summaryJson = await summary.json();
        log.innerHTML = summaryJson.choices[0].text;
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
});


