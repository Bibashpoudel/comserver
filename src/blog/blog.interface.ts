interface blog {
  title: string;

  addedBy?: string;
  content: Blob;
  tag: Array<string>;
  categories: string;
  isTrue?: boolean;
}

export { blog };
