import {Readable} from "stream";
import {EarlParser} from "../lib/EarlParser";

describe('EarlParser', () => {

  const parser: EarlParser = new EarlParser();
  const subject = 'http://example.org/subject';

  describe('#parse', () => {

    it('should handle empty files', async () => {
      const readable = new Readable();
      readable.push(`
<http://ex.org/s> <http://ex.org/p> <http://ex.org/o1>, <http://ex.org/o2>.
`);
      readable.push(null);

      expect(await parser.parse(subject, readable, 'file.ttl')).toEqual({ compliance: 0 });
    });

    it('should handle files with unrelated triples', async () => {
      const readable = new Readable();
      readable.push(`
<http://ex.org/s> <http://ex.org/p> <http://ex.org/o1>, <http://ex.org/o2>.
`);
      readable.push(null);

      expect(await parser.parse(subject, readable, 'file.ttl')).toEqual({ compliance: 0 });
    });

    it('should throw on unknown content types', async () => {
      const readable = new Readable();
      readable.push(`
<http://ex.org/s> <http://ex.org/p> <http://ex.org/o1>, <http://ex.org/o2>.
`);
      readable.push(null);

      await expect(parser.parse(subject, readable, 'file.unknown'))
        .rejects.toThrow("No valid extension could be detected from the given 'path' option: 'file.unknown'");
    });

    it('should handle one assertion without result predicate', async () => {
      const readable = new Readable();
      readable.push(`
@prefix earl: <http://www.w3.org/ns/earl#>.
_:assertion0  earl:subject <${subject}>.
`);
      readable.push(null);

      expect(await parser.parse(subject, readable, 'file.ttl')).toEqual({ compliance: 0 });
    });

    it('should handle one assertion without linked result', async () => {
      const readable = new Readable();
      readable.push(`
@prefix earl: <http://www.w3.org/ns/earl#>.
_:assertion0  earl:subject <${subject}>;
    earl:result _:result0.
`);
      readable.push(null);

      expect(await parser.parse(subject, readable, 'file.ttl')).toEqual({ compliance: 0 });
    });

    it('should handle one assertion with linked result, which is invalid', async () => {
      const readable = new Readable();
      readable.push(`
@prefix earl: <http://www.w3.org/ns/earl#>.
_:assertion0  earl:subject <${subject}>;
    earl:result _:result0.
_:result0 earl:outcomeINVALID earl:passed.
`);
      readable.push(null);

      expect(await parser.parse(subject, readable, 'file.ttl')).toEqual({ compliance: 0 });
    });

    it('should handle one assertion with linked result', async () => {
      const readable = new Readable();
      readable.push(`
@prefix earl: <http://www.w3.org/ns/earl#>.
_:assertion0  earl:subject <${subject}>;
    earl:result _:result0.
_:result0 earl:outcome earl:passed.
`);
      readable.push(null);

      expect(await parser.parse(subject, readable, 'file.ttl')).toEqual({ compliance: 1 });
    });

    it('should handle one assertion with linked result for a different subject', async () => {
      const readable = new Readable();
      readable.push(`
@prefix earl: <http://www.w3.org/ns/earl#>.
_:assertion0  earl:subject <${subject + 'OTHER'}>;
    earl:result _:result0.
_:result0 earl:outcome earl:passed.
`);
      readable.push(null);

      expect(await parser.parse(subject, readable, 'file.ttl')).toEqual({ compliance: 0 });
    });

    it('should handle a passed and failed test', async () => {
      const readable = new Readable();
      readable.push(`
@prefix earl: <http://www.w3.org/ns/earl#>.
_:assertion0  earl:subject <${subject}>;
    earl:result [ earl:outcome earl:passed ].
_:assertion1  earl:subject <${subject}>;
    earl:result [ earl:outcome earl:failed ].
`);
      readable.push(null);

      expect(await parser.parse(subject, readable, 'file.ttl')).toEqual({ compliance: 0.5 });
    });

    it('should handle 2 passed, 2 skipped and 2 failed tests', async () => {
      const readable = new Readable();
      readable.push(`
@prefix earl: <http://www.w3.org/ns/earl#>.
_:assertion0  earl:subject <${subject}>;
    earl:result [ earl:outcome earl:passed ].
_:assertion1  earl:subject <${subject}>;
    earl:result [ earl:outcome earl:passed ].
_:assertion2  earl:subject <${subject}>;
    earl:result [ earl:outcome earl:skipped ].
_:assertion3  earl:subject <${subject}>;
    earl:result [ earl:outcome earl:failed ].
_:assertion4  earl:subject <${subject}>;
    earl:result [ earl:outcome earl:failed ].
`);
      readable.push(null);

      expect(await parser.parse(subject, readable, 'file.ttl')).toEqual({ compliance: 0.6 });
    });

  });

});
