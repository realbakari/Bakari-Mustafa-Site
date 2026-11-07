import { Bar, Button, Stage, Text } from '../ko-kit'
import { PHOTO } from '../ko-shared'
import './ko-dupes.css'

// Kora, comparing possible duplicates: the sheet Kora shows for an item
// flagged as a copy of one already in the library. The same photo twice, the
// new one marked This item, and three choices, none of them made for you. A
// still: nothing happens until a person decides. Cancel is left out, so the
// two real choices carry the sheet.
//
// Real strings: the title and its explanation as Kora words them, the two
// column labels and names, the buttons. Each item's path and date is a bar.

export default function KoraDupes() {
  return (
    <Stage width={520} height={440} compact={{ below: 520, width: 358, height: 420 }} accent="#b5482a" greys="cool" initial={{}} className="kdu">
      {() => {
        return (
          <section className="kdu-sheet">
            <Text className="kdu-title">Compare Possible Duplicates</Text>
            <Text wrap className="kdu-text">
              These items have exactly the same content. Keeping both is fine — for example, the same photo filed under two events. Kora never removes duplicates on its own.
            </Text>
            <div className="kdu-pair">
              <Side label="This item" name="Opening night copy" current />
              <Side label="Already in library" name="Opening night" />
            </div>
            <div className="kdu-actions">
              <Button>Move This Item to Trash</Button>
              <Button>Keep Both</Button>
            </div>
          </section>
        )
      }}
    </Stage>
  )
}

function Side({ label, name, current }: { label: string; name: string; current?: boolean }) {
  return (
    <div className="kdu-side">
      <Text className="kdu-label" data-current={current || undefined}>{label}</Text>
      <img className="kdu-thumb" src={PHOTO('friends')} alt="" draggable={false} />
      <Text className="kdu-name">{name}</Text>
      <Bar w={current ? 128 : 112} h={6} tone={2} />
      <Bar w={current ? 96 : 104} h={6} tone={2} />
    </div>
  )
}
