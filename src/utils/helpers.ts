import mongoose from 'mongoose';

export const composeErrorMessage = (error: mongoose.Error.ValidationError)=>{
  const composedMessage = `${Object.values(error.errors).map((err)=>err.message).join(', ')}`;
  return composedMessage;
}

export const urlValidation = (link: string) =>{
  const urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(link);
}