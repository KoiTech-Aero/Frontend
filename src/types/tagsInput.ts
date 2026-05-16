export interface tagsInputProps {
  tags: string[];

  setTags: React.Dispatch<
    React.SetStateAction<string[]>
  >;
}