interface blog {
  title: string;
  image: string;
  addedBy?: string;
  content: BinaryData;
  tag: Array<string>;
  categories: string;
  isTrue?: boolean;
}

export { blog };
