export function DatePtTranslate(dateWithMonthInFull:String){
  
  const TranslatedDate =  dateWithMonthInFull
  .replace('January', 'Janeiro')
  .replace('February', 'Fevereiro')
  .replace('March', 'Março')
  .replace('April', 'Abril')
  .replace('May', 'Maio')
  .replace('June', 'Junho')
  .replace('July', 'Julho')
  .replace('August', 'Agosto')
  .replace('September', 'Setembro')
  .replace('October', 'Outubro')
  .replace('November', 'Novembro')
  .replace('December', 'Dezembro');
  
  return TranslatedDate
}