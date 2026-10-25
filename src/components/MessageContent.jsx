function renderInline(text, keyPrefix = "i") {
  const nodes = [];
  const pattern =
    /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
  let last = 0;
  let match;
  let n = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }

    if (match[1]) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${n}`} className="font-semibold text-white">
          {match[1]}
        </strong>
      );
    } else if (match[2]) {
      nodes.push(
        <em key={`${keyPrefix}-e-${n}`} className="italic text-zinc-200">
          {match[2]}
        </em>
      );
    } else if (match[3]) {
      nodes.push(
        <code
          key={`${keyPrefix}-c-${n}`}
          className="rounded-md border border-white/10 bg-white/10 px-1.5 py-0.5 font-mono text-[0.8em] text-cyan-200"
        >
          {match[3]}
        </code>
      );
    } else if (match[4] && match[5]) {
      nodes.push(
        <a
          key={`${keyPrefix}-a-${n}`}
          href={match[5]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 transition hover:text-cyan-200"
        >
          {match[4]}
        </a>
      );
    }

    last = match.index + match[0].length;
    n += 1;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return nodes.length ? nodes : text;
}

function MessageContent({ text, tone = "assistant" }) {
  if (tone === "user") {
    return <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{text}</p>;
  }

  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let listItems = [];
  let paragraph = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const content = paragraph.join(" ").trim();
    if (content) {
      blocks.push({ type: "p", content });
    }
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push({ type: "ul", items: [...listItems] });
    listItems = [];
  };

  for (const line of lines) {
    const bullet = line.match(/^\s*[-*]\s+(.+)$/);
    const numbered = line.match(/^\s*\d+\.\s+(.+)$/);

    if (bullet || numbered) {
      flushParagraph();
      listItems.push((bullet || numbered)[1]);
      continue;
    }

    if (line.trim() === "") {
      flushList();
      flushParagraph();
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  flushList();
  flushParagraph();

  if (!blocks.length) {
    return (
      <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-zinc-200">
        {renderInline(text)}
      </p>
    );
  }

  return (
    <div className="space-y-3 text-[15px] leading-relaxed text-zinc-200">
      {blocks.map((block, i) => {
        if (block.type === "ul") {
          return (
            <ul
              key={`ul-${i}`}
              className="space-y-2 border-l border-cyan-500/20 pl-4"
            >
              {block.items.map((item, j) => (
                <li key={`li-${i}-${j}`} className="relative leading-relaxed">
                  <span className="absolute -left-[1.15rem] top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  {renderInline(item, `li-${i}-${j}`)}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`p-${i}`} className="leading-relaxed">
            {renderInline(block.content, `p-${i}`)}
          </p>
        );
      })}
    </div>
  );
}

export default MessageContent;
