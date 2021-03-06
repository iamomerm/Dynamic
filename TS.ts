//Dynamic = Smart Array
class Dynamic
{
	private static Counter = 0;

	Dynamic: object; /* Index - Object */

	Reference: object; /* Key - Index */

	constructor() { this.Dynamic = {}; this.Reference = {}; }

	Add(Key, Value)
	{
		let Object = {Key: Key, Value: Value};

		this.Dynamic[Dynamic.Counter] = Object; /* Indexed Object */

		this.Reference[Key] = Dynamic.Counter; /* Key - Index */

		Dynamic.Counter++;
	}

	Print()
	{
		let KeysCounter = Object.keys(this.Dynamic).length;

		if (KeysCounter != 0)
		{
			for (let I = 0; I < KeysCounter; I++)
			{
				console.log('[' + I + '] Key: ' + this.Dynamic[I]['Key'] +', Value: ' + this.Dynamic[I]['Value']);
			}
		}

		console.log('Elements: ' + KeysCounter);
	}

	GetIndex(Index: number) { return this.Dynamic[Index]; } /* Return Undefined in Case of Error */

	GetKey(Key: any) 
	{ 
		let Index = this.Reference[Key]; /* Get Index */;

		return this.Dynamic[Index]; /* Return Undefined in Case of Error */
	} 

	RemoveIndex(Index: number) /* Low Performance */
	{
		let KeysCounter = Object.keys(this.Dynamic).length;

		if ((Index >= 0) && (Index < KeysCounter))
		{
			let ReferenceKey = this.Dynamic[Index]['Key'];

			//Rearrangement
			if (Index != KeysCounter - 1)
			{
				delete this.Dynamic[Index]; /* Delete Key */

				delete this.Reference[ReferenceKey]; /* Delete Key */

				for (let I = Index; I < KeysCounter - 1; I++) /* Rearrangement */
				{
					let CurrentReferenceKey = this.Dynamic[I + 1]['Key'];

					let CurrentObject = this.Dynamic[I + 1];

					delete this.Reference[CurrentReferenceKey];

					delete this.Dynamic[I + 1];

					this.Reference[CurrentReferenceKey] = I; /* Reference Rearrangement */

					this.Dynamic[I] = CurrentObject; /* Dynamic Rearrangement */
				}
			}

			else
			{
				delete this.Dynamic[Index]; /* Delete Key */

				delete this.Reference[ReferenceKey]; /* Delete Key */
			}
		}

		Dynamic.Counter--;
	}

	RemoveKey(Key: any) /* Low Performance */
	{
		let KeysCounter = Object.keys(this.Dynamic).length;

		let Index = this.Reference[Key]; /* Get Index */

		if ((Index >= 0) && (Index < KeysCounter))
		{
			//Rearrangement
			if (Index != KeysCounter - 1) 
			{
				delete this.Dynamic[Index]; /* Delete Key */

				delete this.Reference[Key]; /* Delete Key */

				for (let I = Index; I < KeysCounter - 1; I++) /* Rearrangement */
				{
					let CurrentReferenceKey = this.Dynamic[I + 1]['Key'];

					let CurrentObject = this.Dynamic[I + 1];

					delete this.Reference[CurrentReferenceKey];

					delete this.Dynamic[I + 1];

					this.Reference[CurrentReferenceKey] = I; /* Reference Rearrangement */

					this.Dynamic[I] = CurrentObject; /* Dynamic Rearrangement */
				}
			}

			else
			{
				delete this.Dynamic[Index]; /* Delete Key */

				delete this.Reference[Key]; /* Delete Key */
			}
		}

		Dynamic.Counter--;
	}
}

let myDynamic = new Dynamic();

myDynamic.Add('David', 5);

myDynamic.Add('John', 15);

myDynamic.Add('Danny', 25);

myDynamic.Add('Ronny', 35);

myDynamic.Add('George', 45);

console.log(myDynamic.GetIndex(3));

console.log(myDynamic.GetKey('John'));

myDynamic.Print();

myDynamic.RemoveKey('Ronny');

myDynamic.RemoveIndex(3);

myDynamic.Print();

