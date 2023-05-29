type DescriptionProps = {
  str: string;
};

function Description({ str }: DescriptionProps) {
  const regex = /`([^`]+)`/g;
  const transformedString = str.replace(regex, '<code class="docs-code">$1</code>');

  return (
    <div
      className="docs-content__description"
      dangerouslySetInnerHTML={{ __html: transformedString }}
    />
  );
}

export default Description;
