export const filterImagesAndAttachmentsFromDescription = (description: string) => {
  const attachments = description.match(/<a[^>]*>.*?<\/a>/g);
  const images = description.match(/<img[^>]*\/>/g);
  if (images) {
    images.forEach((image) => {
      description = description.replace(image, '');
    });
  }
  if (attachments) {
    attachments.forEach((attachment) => {
      description = description.replace(attachment, '');
    });
  }
  console.log(description);
  return description;
}
