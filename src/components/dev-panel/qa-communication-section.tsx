import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Comment } from '@/types/dev-panel';
import { MessageSquare, Send } from 'lucide-react';

interface QACommunicationSectionProps {
  comments: Comment[];
  newComment: string;
  setNewComment: (value: string) => void;
  onAddComment: () => void;
}

export function QACommunicationSection({
  comments,
  newComment,
  setNewComment,
  onAddComment,
}: QACommunicationSectionProps) {
  return (
    <div>
      <h4 className="mb-3 flex items-center gap-2 font-medium">
        <MessageSquare className="h-4 w-4" />
        Comunicación con QA
      </h4>

      <div className="mb-4 space-y-3">
        {comments.map((comment, index) => (
          <div key={index} className="bg-muted rounded-lg border p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">{comment.author}</span>
              <span className="text-muted-foreground text-xs">
                {comment.timestamp.toLocaleDateString()}
              </span>
            </div>
            <p className="text-muted-foreground text-sm">{comment.message}</p>
            {comment.attachments && (
              <div className="mt-2 flex gap-2">
                {comment.attachments.map((attachment, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    📎 {attachment}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Textarea
          placeholder="Escribe un mensaje para QA..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          className="flex-1"
          rows={2}
        />
        <Button onClick={onAddComment} disabled={!newComment.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
