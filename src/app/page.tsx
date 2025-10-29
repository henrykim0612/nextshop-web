export default function Home() {
  return (
    <div>
      <h1>Roboto 폰트 적용 테스트 Width: 400</h1>
      <h1 className={'font-medium'}>Roboto 폰트 적용 테스트 Width: 500</h1>
      <h1 className={'font-bold my-custom-text-color'}>Roboto 폰트 적용 테스트 Width: 700</h1>
      <div className={'w-20 h-20 my-new-utility-class'}>
        <h1>Hello!</h1>
      </div>
    </div>
  );
}
