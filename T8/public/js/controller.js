let currentParagraph = 1; // starting paragraph
let hasMore = true;

async function loadParagraph() {

    const container = document.getElementById("data");

    // remove the default message text
    if (container.textContent.includes("If you can see this message")) {
        container.innerHTML = "";
    }

    if (!hasMore) return;

    const res = await fetch(`/text?paragraph=${currentParagraph}`);
    const data = await res.json();

    let lastParaId = null;

    for (const para of data.data) {
        lastParaId = para.id;

        const wrapper = document.createElement("div");
        wrapper.id = `paragraph_${para.id}`;

        const p = document.createElement("p");
        p.textContent = para.content;
        const bold = document.createElement("b");
        bold.textContent = ` (Paragraph: ${para.id})`;
        p.appendChild(bold);

        wrapper.appendChild(p);
        container.appendChild(wrapper);

        const btn = document.createElement("button");
        btn.textContent = `Likes: ${para.likes}`;
        btn.className = "btn like";
        wrapper.appendChild(btn);

        btn.addEventListener("click", () => likeParagraph(para.id));
    }

    currentParagraph += data.data.length;
    hasMore = data.next;

    if (!hasMore && lastParaId !== null) {
        const endMsg = document.createElement("p");
        endMsg.innerHTML = `<b>You have reached the end!</b>`;
        container.appendChild(endMsg);
    }
}





async function likeParagraph(paragraphId) {
  try {
    const res = await fetch('/text/like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paragraph: paragraphId }),
    });

    if (res.ok) {
      const data = await res.json();
      const btn = document.getElementById(`paragraph_${paragraphId}`).querySelector('.btn.like');
      btn.textContent = `Likes: ${data.data.likes}`;
    }
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener('scroll', () => {
  // total scrollable height
  const scrollHeight = document.documentElement.scrollHeight;
  // current scroll position
  const scrollTop = document.documentElement.scrollTop;
  // visible height of the viewport
  const clientHeight = document.documentElement.clientHeight;

  // check if we've reached the bottom
  if (scrollTop + clientHeight >= scrollHeight - 5) { // small offset for precision
    console.log("Reached the bottom!");
    // call your function to load more paragraphs
    loadParagraph();
  }
});

// load paragraph on page load
document.addEventListener("DOMContentLoaded", loadParagraph);

