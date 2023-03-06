/**
 * Inspired on code from http://jsfiddle.net/alnitak/xkX5v and
 * https://stackoverflow.com/a/21286249/586382
 *
 * @param {*} head
 * @param {*} onto
 * @returns
 */
export default function(head, onto)
{
  if(!head) return onto
  if(!onto) return head

  let prototype = onto
  const ontos = [prototype]
  while((prototype = Object.getPrototypeOf(prototype))) ontos.push(prototype)
  console.log(ontos)

  if(ontos.includes(head)) return head

  const chain = [head]
  while((head = Object.getPrototypeOf(head)))
  {
    if(ontos.includes(head)) break

    chain.push(head)
  }
  console.log(chain)

  // while(chain.length) onto = Object.create(onto, chain.pop())
  while(chain.length)
  {
    const derived = new Function(`return ${chain.pop().toString()}`)()

    Object.setPrototypeOf(derived.prototype, onto.prototype)

    onto = derived
  }
  console.log(onto)

  return onto
}
